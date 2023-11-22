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
		require: true,
		default: Date.now,
	},
	PaymentMethod: {
		type: ['efectivo', 'tarjeta', 'transferencia'],
		require: true,
		trim: true,
	},
	saleAmount: {
		type: Number,
	}
}); const SaleModel = mongoose.model<ISaleSaved>('Sale', saleSchema);
export default SaleModel;



