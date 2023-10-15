import { NextFunction, Request, Response } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (fn: AsyncFunction): AsyncFunction => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
};
