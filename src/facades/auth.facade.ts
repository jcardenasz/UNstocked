import { Request, Response } from 'express';
import { IPayLoad, IUser } from '../dtos/Iuser.dto';
import UserModel from '../models/users.model';
import { AuthServices  } from '../services/auth.services';

class AuthFacade {
	private readonly authServices = new AuthServices;
	public async register (req: Request, res: Response): Promise<Response > {

		const { username, email, password }: IUser = req.body;
		const existingUser = await UserModel.findOne({ email });
		if (existingUser !== null) return res.status(500).send('User already exists');

		const hashPassword = await this.authServices.encodedPassword(password, res);
		const newUser = new UserModel({
			username,
			email,
			password: hashPassword
		});

		const userSaved = await newUser.save();
		const payload:IPayLoad = { id: userSaved.id, email: userSaved.email };
		await this.authServices.setCookies(payload, res);

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

			const passwordFound = await this.authServices.compareCredential(password, userFound.password);

			if (!passwordFound ) return res.status(400).json({ message: 'Password not found - User or password incorrect ' });
			const payload:IPayLoad = { id: userFound.id, email: userFound.email };
			await this.authServices.setCookies(payload,res);
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
		res.cookie('refreshToken', '', {
			expires: new Date(0)
		});
		return res.status(200).json({ message: 'Logout successfully' });
	}

	public profile (_req: Request, res: Response): Response {
		return res.status(200).json({ message: 'Bring profile' });
	}

	public async refreshToken (req: Request, res: Response): Promise<Response> {
		try{
			const id  = this.authServices.decodedToken(req);
			const user = await UserModel.findById(id);
			if (user === null) return res.status(401).json({ message: 'User not found' });
			const tokenRefresh = await this.authServices.createRefreshToken({ id: user.id, email: user.email });
			res.cookie('refreshToken', tokenRefresh);
			return res.status(200).json({ message: 'Token refresh' });
		}catch(error){
			return res.status(500).json({ message: error });
		}
	}
} export default new AuthFacade();
