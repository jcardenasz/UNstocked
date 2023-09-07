/* eslint-disable no-return-await */
import jwt from 'jsonwebtoken';
import config from '../config/config';
export async function createJWT (payload: object): Promise<string | undefined> {
	const create: string | undefined = await new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.jwtSecret,
			{
				expiresIn: '1h'
			},
			(err, token) => {
				if (err !== null) reject(err);
				resolve(token);
			});
	}
	);
	return create;
}
