import mongoose from 'mongoose';
import { ITransactionSaved } from '../dtos/Itransactions.dto';


const transactionSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	type: {
		type: String,
		enum: ['income', 'expense'],
		require: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
});
const TransactionModel = mongoose.model<ITransactionSaved>('Transaction', transactionSchema);
export default TransactionModel;

