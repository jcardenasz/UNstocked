import jwt from 'jsonwebtoken';
import {Config} from '../config/config';
import { Request, Response} from 'express';
import { IPayLoad } from '../dtos/IpayLoad.dto';
import { IUser } from '../dtos/Iuser.dto';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

export class AuthServices {
	private readonly config = new Config;

	public validateUser(req: Request): IUser | null {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return null;
		return currentUser;
	}

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

	public async encodedPassword(password: string): Promise<string> {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			return hashedPassword;
		}	catch (error) {
			throw new Error('Error hashing password');
		}
	}

	public async setCookies (payload: IPayLoad, res: Response): Promise<Response> {
		const tokenLogin = await this.createToken({ id: payload.id, email: payload.email });
		const tokenRefresh = await this.createRefreshToken({ id: payload.id, email: payload.email });
		res.cookie('token', tokenLogin, { sameSite: 'none', secure: true });
		res.cookie('refreshToken', tokenRefresh, { sameSite: 'none', secure: true });
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
	//Esta función es para validar el token de reseteo de contraseña.
	//Si el token es válido, devuelve el payload, si no, devuelve false.
	//util para cuando se haga la validación del token de usuario para dejarlo cambiar contraseña.

	public async validateForgotPasswordToken(token: string): Promise<boolean> {
		const forgotPasswordKey = process.env.FORGOT_PASSWORD_KEY;
		if (!forgotPasswordKey) {
			throw new Error('FORGOT_PASSWORD_KEY is not defined in the environment');
		}
		try {
			jwt.verify(token, forgotPasswordKey) as IPayLoad;
			return true;
		}	catch (error) {
			throw new Error('500. Error with forgotPassword token');
		}
	}
}
