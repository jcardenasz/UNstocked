import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { IUser } from '../dtos/Iuser.dto';
import UserModel from '../models/users.model';
import { createJWT } from '../libs/jwt';

class AuthFacade {
	public async register (req: Request, res: Response): Promise<Response > {
		const { username, email, password }: IUser = req.body;
		const existingUser = await UserModel.findOne({ email });
		if (existingUser !== null) return res.status(500).send('User already exists');

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = new UserModel({
			username,
			email,
			password: hashPassword
		});
		// servicio
		const userSaved = await newUser.save();
		const tokenLogin = await createJWT({ id: userSaved.id, email: userSaved.email });
		res.cookie('token', tokenLogin);

		return res.json({
			id: userSaved.id,
			username: userSaved.username,
			email: userSaved.email
		});
	}

	public async login (req: Request, res: Response): Promise< Response> {
		try {
			const { email, password } = req.body;
			const userFound = await UserModel.findOne({ email });

			if (userFound === null) return res.status(400).json({ message: 'User not found - User or password incorrect ' });

			const passwordFound = await bcrypt.compare(password, userFound.password);

			if (!passwordFound) return res.status(400).json({ message: 'Password not found - User or password incorrect ' });

			const token = await createJWT({ id: userFound.id, email: userFound.email });
			res.cookie('token', token);

			return res.json({
				id: userFound.id,
				username: userFound.username,
				email: userFound.email
			});
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	public logout (_req: Request, res: Response): Response {
		res.cookie('token', '', {
			expires: new Date(0)
		});
		return res.status(200).json({ message: 'Logout successfully' });
	}

	public profile (_req: Request, res: Response): Response {
		return res.status(200).json({ message: 'Bring profile' });
	}
} export default new AuthFacade();
