import { IUser } from "../dtos/Iuser.dto";
import { Request } from "express";
import BusinessModel from "../models/business.model";

export class BusinessServices{
	public validateUser(req: Request): IUser | null {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return null;
		return currentUser;
	}
	public async findBusiness(req: Request, currentUser:IUser): Promise< any |null> {
		const business = await BusinessModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (business === null || business.length === 0 ) return null;
		return business ;
	}
}