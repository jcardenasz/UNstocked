import mongoose from 'mongoose';
import { ISaleSaved } from '../dtos/Itransactions.dto';

const saleSchema = new mongoose.Schema({
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
	saleAmount: {
		type: Number,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		require: true
	}
}); const SaleModel = mongoose.model<ISaleSaved>('Sale', saleSchema);
export default SaleModel;



