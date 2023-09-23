import { IUser } from "../dtos/Iuser.dto";
import { Request } from "express";
import ProductModel from "../models/products.model";
// import { IProductSaved } from "../dtos/IProduct.dto";

export class ProductServices{
	public validateUser(req: Request): IUser | null {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return null;
		return currentUser;
	}
	public async findProduct(req: Request, currentUser:IUser): Promise< any| null> {
		const product = await ProductModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (product === null || product.length === 0 ) return null;
		return product ;
	}
}