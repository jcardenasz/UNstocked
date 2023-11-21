
import { ObjectId } from 'mongoose';

export interface ITransaction {
  _id: ObjectId;
  name: string;
  type: string;
  amount: number;
  date: Date;
}

export interface ITransactionSaved extends ITransaction {
  createdAt: Date;
  updatedAt: Date;
}
