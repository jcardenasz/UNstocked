import { IUser } from "../dtos/Iuser.dto";
import { Request } from "express";
import CategoryModel from "../models/categories.model";
// import { IProductSaved } from "../dtos/IProduct.dto";

export class CategoryServices{
	public validateUser(req: Request): IUser | null {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return null;
		return currentUser;
	}
	public async findCategory(req: Request, currentUser:IUser): Promise< any | null> {
		const category = await CategoryModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (category === null || category.length === 0 ) return null;
		return category ;
	}
}