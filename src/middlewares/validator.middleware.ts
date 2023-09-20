import { Request, Response,NextFunction } from "express";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const validateSchema = (schema: typeof registerSchema | typeof loginSchema ) =>  (req: Request, res: Response, next: NextFunction): Response | void =>{
	try{
		schema.parse(req.body);
		return next();
	}catch(error){
		return res.status(400).json({error: (error as ZodError).issues.map((issue) => issue.message)});
	}
};