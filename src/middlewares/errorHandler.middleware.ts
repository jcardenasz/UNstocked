import { NextFunction, Request, Response } from "express";
import { ServerError } from "../errors/server.error";

export const errorHandler = (err: ServerError , _req: Request, res: Response, next: NextFunction): void => {
	res.header("Content-Type", "application/json");
	const status =  err.getStatus() || 400;
	res.status(status).send(err.message);
	next();
};

