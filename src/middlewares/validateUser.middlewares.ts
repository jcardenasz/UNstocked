import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users.model';
import { AuthServices } from '../services/auth.services';
import { IUserSaved } from '../dtos/Iuser.dto';
import { ObjectId } from 'mongoose';
// import { IUserSaved } from '../dtos/Iuser.dto';

const authServices = new AuthServices;
export const authRequired =  (type: "access"|"refresh") => async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
	let id: ObjectId;
	if (type === "access") {
		id = authServices.decodedToken(req);
	}else{
		id = authServices.decodedRefreshToken(req);
	}
	const userFound = await UserModel.findById(id);
	if (userFound === null) return res.status(401).json({message:"No user found"});
	req.user = {
		id: userFound?.id,
		username: userFound?.username,
		email: userFound?.email,
		createdAt: userFound?.createdAt,
		updatedAt: userFound?.updatedAt
	} as IUserSaved;
	return next();
};
