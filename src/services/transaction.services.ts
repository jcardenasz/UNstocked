import { IUser } from "../dtos/Iuser.dto";
import { Request } from "express";
import TransactionModel from "../models/transactions.model";

export class TransactionServices {
	public validateUser(req: Request): IUser | null {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return null;
		return currentUser;
	}

	public async findTransaction(req: Request, currentUser:IUser): Promise< unknown |null> {
		const product = await TransactionModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (product === null || product.length === 0 ) return null;
		return product ;
	}
}

