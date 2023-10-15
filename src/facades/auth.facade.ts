import { Request, Response } from 'express';
import { IUser, IUserSaved } from '../dtos/Iuser.dto';
import UserModel from '../models/users.model';
import { AuthServices  } from '../services/auth.services';
import { IPayLoad } from '../dtos/IPayload.dto';

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
		const payload:IPayLoad = { id: userSaved.id, email: userSaved.email , type: 'access'};
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
			const payload:IPayLoad = { id: userFound.id, email: userFound.email , type: 'access'};
			await this.authServices.setTokens(payload, req);

			return res.json({
				id: userFound.id,
				username: userFound.username,
				email: userFound.email,
				tokenAccess: req.headers.authorization,
				tokenRefresh: req.headers['x-token']
			});
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	public logout (req: Request, res: Response): Response {
		req.headers.authorization = "";
		req.headers['x-token'] = "";
		return res.status(200).json({ message: 'Logout successfully' });
	}

	public profile (req: Request , res:Response): Response  {
		const user = req.user as IUserSaved;
		if (!user.id) throw new Error('User ID not found');
		return res.json({
			id: user.id.toString(),
			username: user.username,
			email: user.email
		});
	}


	public async refreshToken (req: Request, res: Response): Promise<Response> {
		const user = req.user as IUserSaved;
		if (user === null || user.id === undefined) throw res.status(401).json({ message: 'User not found' });
		const tokenAccess =  await this.authServices.createToken({ id: user.id, email: user.email, type: 'access' });
		const tokenRefresh =  await this.authServices.createToken({ id: user.id, email: user.email, type: 'refresh' });
		return res.status(200).json({
			tokenAccess,
			tokenRefresh
		});
	}
} export default new AuthFacade();
