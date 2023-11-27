import mongoose from 'mongoose';
import { IExpenseSaved } from '../dtos/Itransactions.dto';

const transactionSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	description: {
		type: String,
		require: true,
		trim: true,
	},
	date: {
		type: Date,
		require: false,
		default: Date.now,
	},
	paymentMethod: {
		type: String,
		require: true,
		trim: true,
	},
	expenseAmount: {
		type: Number,
		require: true,
		trim:true,
	},
	category: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "CategoryModel",
		require: false,
	},
	supplier: {
		type: String,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		require: true
	}
}); const ExpenseModel = mongoose.model<IExpenseSaved>('Expense', transactionSchema);
export default ExpenseModel;

