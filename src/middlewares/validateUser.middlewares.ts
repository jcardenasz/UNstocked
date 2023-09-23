import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users.model';
import { AuthServices } from '../services/auth.services';
// import { IUserSaved } from '../dtos/Iuser.dto';

const authServices = new AuthServices;
export const authRequired = async (req: Request, res: Response, next: NextFunction): Promise<Response | void>=> {

	const id = authServices.decodedToken(req);
	if (id === null) return res.status(401).json({ message: 'No token or no id' });
	const userFound = await UserModel.findById(id);
	if (userFound === null) return res.status(401).json({message:"No user found"});
	req.user = {
		id: userFound?.id,
		username: userFound?.username,
		email: userFound?.email,
		createdAt: userFound?.createdAt,
		updatedAt: userFound?.updatedAt
	};
	return next();
};
