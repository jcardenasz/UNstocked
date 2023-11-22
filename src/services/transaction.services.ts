import { IUser } from "../dtos/Iuser.dto";
import { Request } from "express";
import SaleModel from "../models/sale.model";
import ExpenseModel from "../models/expense.model";

export class TransactionServices {
	public validateUser(req: Request): IUser | null {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return null;
		return currentUser;
	}

	public async findSale(req: Request, currentUser:IUser): Promise< unknown |null> {
		const transaction = await SaleModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (transaction === null || transaction.length === 0 ) return null;
		return transaction ;
	}

	public async findExpense(req: Request, currentUser:IUser): Promise< unknown |null> {
		const transaction = await ExpenseModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (transaction === null || transaction.length === 0 ) return null;
		return transaction ;
	}
}

