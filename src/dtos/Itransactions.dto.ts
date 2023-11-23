import { ObjectId } from 'mongoose';
import { ICategories } from './Icategories.dto';

export interface ITransaction {
  _id: ObjectId;
  description: string;
  date: Date;
  paymentMethod: string;
}

export interface ISale extends ITransaction {
  name: string;
  saleAmount: number;
}

export interface IExpense extends ITransaction {
  name: string;
  expenseAmount: number;
  category: ICategories[];
  supplier: string;
}

export interface ISaleSaved extends ISale {
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpenseSaved extends IExpense {
  createdAt: Date;
  updatedAt: Date;
}
