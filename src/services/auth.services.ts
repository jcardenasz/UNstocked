import jwt from 'jsonwebtoken';
import {Config} from '../config/config';
import { Request, Response} from 'express';
import { IPayLoad } from '../dtos/IPayload.dto';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import { IPayLoadToken } from '../dtos/IPayload.dto';
// import { ServerError } from '../errors/server.error';

export class AuthServices {
	private readonly config = new Config;

	public async createToken (payload: IPayLoad): Promise<string | null> {
		let secret: string;
		let time: string;
		const type = payload.type;
		if (type === 'access'){
			secret = this.config.getJWT_SECRET();
			time = this.config.getJWT_EXPIRES_ACCESS();
		}else{
			secret = this.config.getJWT_REFRESH_SECRET();
			time = this.config.getJWT_EXPIRES_REFRESH();
		}
		const token: string | undefined = await new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				secret,
				{
					expiresIn: time,
					issuer: this.config.getJWT_ISSUER(),
					audience: this.config.getJWT_AUDIENCE(),
				},
				(err, token) => {
					if (err !== null) reject(err);
					resolve(token);
				});
		});
		if (token === undefined) return null; //throw new Error("No token");
		return token;
	}

	public decodedToken (req: Request): ObjectId |null{
		try{
			// const refreshToken: string | undefined  = req.cookies.refreshToken;
			const token: string | undefined  = req.headers.authorization;
			if (token === undefined) return null; //throw new ServerError("Token undefined",401);
			const parts = token.split(' ');
			if (parts.length !== 2 || parts[0] !== "Bearer") return null; //throw new ServerError("Not word Bearer in token",401);
			const decoded = jwt.verify(parts[1],this.config.getJWT_SECRET(),{
				issuer: this.config.getJWT_ISSUER(),
				audience: this.config.getJWT_AUDIENCE()
			}) as IPayLoadToken;
			if (decoded.type !== "access") return null; //new ServerError("Token not valid",401);
			const id : ObjectId = decoded.id;
			if (id === null) return null; //throw new ServerError("No id",401);
			return id;
		}catch(error){
			return null; //throw new ServerError("Not possible decoded token",401);
		}
	}

	public decodedRefreshToken (req: Request): ObjectId | null {
		try{
			// const refreshToken: string | undefined  = req.cookies.refreshToken;
			const token: string = req.headers['x-token'] as string;
			if (token === undefined ) return null; //throw new Error("No token");

			const decoded = jwt.verify(token,this.config.getJWT_REFRESH_SECRET(),{
				issuer: this.config.getJWT_ISSUER(),
				audience: this.config.getJWT_AUDIENCE()
			}) as IPayLoadToken;
			if (decoded.type !== "refresh") return null; //throw new Error("Token not valid");
			const id : ObjectId = decoded.id;
			if (id === null) return null; //throw new Error("No id");
			return id;
		}catch(error){
			return null; //throw new Error(String(error));
		}
	}

	public async setTokens(payload: IPayLoad, req: Request, res: Response): Promise<Response | null> {
		const tokenLogin = await this.createToken({ id: payload.id, email: payload.email, type: 'access' });
		const tokenRefresh = await this.createToken({ id: payload.id, email: payload.email, type: 'refresh' });
		if (tokenLogin === null || tokenRefresh === null) return null; //new ServerError("No token",500);
		req.headers.authorization = tokenLogin;
		req.headers['x-token'] = tokenRefresh;
		return res;
	}


	public async encodedPassword (password:string): Promise<Response | string | null> {
		try{
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			return hashPassword;
		}catch(error){
			return null; //throw res.status(500).json({message:error});
		}
	}
	public async compareCredential (password:string,userFoundPassword:string): Promise<boolean | unknown> {
		const passwordFound = await bcrypt.compare(password, userFoundPassword);
		return passwordFound;
	}
}
