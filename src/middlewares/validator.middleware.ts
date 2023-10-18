import { Request, Response,NextFunction } from "express";
import { SomeZodObject, ZodError } from "zod";

export const validateSchema = (schema: SomeZodObject) =>  (req: Request, res: Response, next: NextFunction): Response | void =>{
	try{
		schema.parse(req.body);
		return next();
	}catch(error){
		return res.status(400).json({error: (error as ZodError).issues.map((issue) => issue.message)});
	}
};