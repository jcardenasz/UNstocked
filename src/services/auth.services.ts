import jwt from 'jsonwebtoken';
import {Config} from '../config/config';
import { Request, Response} from 'express';
import { IPayLoad } from '../dtos/Iuser.dto';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

export class AuthServices {
	private readonly config = new Config;

	public async createToken (payload: object): Promise<string | undefined> {
		const create: string | undefined = await new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				this.config.getJWT_SECRET(),
				{
					expiresIn: '15m'
				},
				(err, token) => {
					if (err !== null) reject(err);
					resolve(token);
				});
		}
		);
		return create;
	}

	public async createRefreshToken (payload: object): Promise<string | undefined> {
		const create: string | undefined = await new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				this.config.getJWT_REFRESH_SECRET(),
				{
					expiresIn: '1d'
				},
				(err, token) => {
					if (err !== null) reject(err);
					resolve(token);
				});
		}
		);
		return create;
	}

	public decodedToken (req: Request): null | ObjectId {
		const refreshToken: string | undefined  = req.cookies.refreshToken;

		if (refreshToken === undefined) return null;
		const decoded = jwt.verify(refreshToken,this.config.getJWT_REFRESH_SECRET()) as IPayLoad;
		const id : ObjectId = decoded.id;
		if (id === null) return null;
		return id;
	}

	public async encodedPassword (password:string, res: Response): Promise<Response | string> {
		try{
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			return hashPassword;
		}catch(error){
			throw res.status(500).json({message:error});
		}
	}

	public async setCookies (payload:IPayLoad,res:Response): Promise<Response> {
		const tokenLogin = await this.createToken({ id: payload.id, email: payload.email });
		const tokenRefresh = await this.createRefreshToken({ id: payload.id, email: payload.email });
		res.cookie('token', tokenLogin);
		res.cookie('refreshToken', tokenRefresh);
		return res;
	}

	public async compareCredential (password:string,userFoundPassword:string): Promise<boolean | unknown> {
		const passwordFound = await bcrypt.compare(password, userFoundPassword);
		return passwordFound;
	}

	public async createForgotPasswordToken (payload: object): Promise<string | undefined> {
		const create: string | undefined = await new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				this.config.getFORGOT_PASSWORD_KEY(),
				{
					expiresIn: '10m'
				},
				(err, token) => {
					if (err !== null) reject(err);
					resolve(token);
				});
		}
		);
		return create;
	}

}
