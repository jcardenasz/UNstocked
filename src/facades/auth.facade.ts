import { Request, Response } from 'express';
import { IUser } from '../dtos/Iuser.dto';
import { IPayLoad } from '../dtos/IpayLoad.dto';
import UserModel from '../models/users.model';
import { AuthServices  } from '../services/auth.services';
import { MailerService } from '../services/mailer.services';

class AuthFacade {
	private readonly authServices = new AuthServices;
	public async register (req: Request, res: Response): Promise<Response > {

		const { username, email, password }: IUser = req.body;
		const existingUser = await UserModel.findOne({ email });
		if (existingUser !== null) return res.status(500).send('User already exists');

		const hashPassword = await this.authServices.encodedPassword(password);
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

	public async forgotPassword (req: Request, res:Response): Promise<Response> {
		const {email} = req.body;
		const userFound = await UserModel.findOne({ email });
		if (userFound === null) return res.status(400).json({ message: 'User not found' });
		const payload:IPayLoad = { id: userFound.id, email: userFound.email };
		const passwordChangeKey = await this.authServices.createForgotPasswordToken(payload);
		//send email with password change link.
		const mailerService = new MailerService;
		await mailerService.sendEmail(userFound.email, passwordChangeKey);
		// passwordChangeKey.then((passwordChangeKey) => {
		// 	mailerService.sendEmail(userFound.email, passwordChangeKey);
		// });
		//mailerService.sendEmail(userFound.email, passwordChangeKey);
		//return res.status(200).json({message: '¡Correo enviado exitosamente!, token:'});
		userFound.updateOne({resetLink: passwordChangeKey});
		//lógica para condicionar el uso de la pagina de reset password
		return res.status(200).json({message: '¡Correo enviado exitosamente!'});
	}
	//Esta función es para validar el token de reseteo de contraseña.
	//Es necesario aplicarlo al front. Funcional
	public async resetPassword(req: Request, res: Response): Promise<Response> {
		const { resetLink, newPassword } = req.body;
		const token = resetLink.split('/').pop();
		let userId;
		if (token) {
			// If the token is a password reset token
			userId = await this.authServices.validateForgotPasswordToken(token);
			if (!userId) return res.status(498).json({ message: 'Invalid token' });
		} else {
			// If the user is already logged in
			const currentUser = this.authServices.validateUser(req);
			if (currentUser === null) return res.status(401).json({ message: 'Unauthorized' });
			userId = currentUser.id;
		}

		try {
			const user = await UserModel.findById(userId);
			if (user === null) return res.status(501).json({ message: 'User not found' });
			// Hash the new password and update the user's password
			const hashedPassword = await this.authServices.encodedPassword(newPassword);
			user.password = hashedPassword;
			await user.save();

			return res.status(200).json({ message: 'Password reset successful' });
		}
		catch (err) {
			return res.status(500).json({ message: 'error resetting your password' });
		}
	}
} export default new AuthFacade();
