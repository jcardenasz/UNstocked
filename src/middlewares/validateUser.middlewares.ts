import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users.model';
import { decodedToken } from '../services/auth.services';

export const authRequired = async (req: Request, res: Response, next: NextFunction): Promise<Response | void>=> {
	const id = decodedToken(req);
	if (id === null) return res.status(401).json({ message: 'No token or no id' });
	const userFound = await UserModel.findById(id);
	req.user = {
		id: userFound?.id,
		username: userFound?.username,
		email: userFound?.email,
		createdAt: userFound?.createdAt,
		updatedAt: userFound?.updatedAt
	};
	return next();
};
