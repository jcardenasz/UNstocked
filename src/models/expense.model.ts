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
		require: true,
		default: Date.now,
	},
	PaymentMethod: {
		type: ['efectivo', 'tarjeta', 'transferencia'],
		require: true,
		trim: true,
	},
	expenseAmount: {
		type: Number,
	},
	category: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "CategoryModel",
		require: true,
	},
	supplier: {
		type: String,
	}
}); const ExpenseModel = mongoose.model<IExpenseSaved>('Expense', transactionSchema);
export default ExpenseModel;

