import { Request, Response, NextFunction } from 'express';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import {IPayLoad} from "../dtos/Iuser.dto";
import UserModel from '../models/users.model';
import { ObjectId } from 'mongoose';
import config from '../config/config';

dotenv.config();
export const authRequired = async (req: Request, res: Response, next: NextFunction): Promise<Response | void>=> {
	const token: string | undefined  = req.cookies.token;
	if (token === undefined) return res.status(401).json({ message: 'No token' });
	const decoded = jwt.verify(token,config.JWT_SECRET) as IPayLoad;
	const id : ObjectId = decoded.id;
	if (id === null) return res.status(401).json({message:"No id"});
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
