import nodemailer from 'nodemailer';

export class MailerService {
	public async sendEmail (email:string,token:Promise<string|undefined>): Promise<void> {
		const transporter = nodemailer.createTransport({
			host:'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.APP_PASSWORD
			},
			tls: {//esto es machete para que no llore por tls
				rejectUnauthorized: false
			}
		});
		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: 'Reset Password',
			html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
			Please click on the following link, or paste this into your browser to complete the process:\n\n
			http://localhost:3000/reset/${token}\n\n
			If you did not request this, please ignore this email and your password will remain unchanged.\n</p>`
		};
		await transporter.sendMail(mailOptions);
	}
}

