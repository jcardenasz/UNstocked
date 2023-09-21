import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Request, Response} from 'express';
import { IPayLoad } from '../dtos/Iuser.dto';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
export async function createToken (payload: object): Promise<string | undefined> {
	const create: string | undefined = await new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.JWT_SECRET,
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

export async function createRefreshToken (payload: object): Promise<string | undefined> {
	const create: string | undefined = await new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.JWT_REFRESH_SECRET,
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

export  function decodedToken (req: Request): null | ObjectId {
	const refreshToken: string | undefined  = req.cookies.refreshToken;

	if (refreshToken === undefined) return null;
	const decoded = jwt.verify(refreshToken,config.JWT_REFRESH_SECRET) as IPayLoad;
	const id : ObjectId = decoded.id;
	if (id === null) return null;
	return id;
}

export async function encodedPassword (password:string, res: Response): Promise<Response | string> {
	try{
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		return hashPassword;
	}catch(error){
		throw res.status(500).json({message:error});
	}
}

export async function setCookies (payload:IPayLoad,res:Response): Promise<Response> {
	const tokenLogin = await createToken({ id: payload.id, email: payload.email });
	const tokenRefresh = await createRefreshToken({ id: payload.id, email: payload.email });
	res.cookie('token', tokenLogin);
	res.cookie('refreshToken', tokenRefresh);
	return res;
}