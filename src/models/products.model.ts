import mongoose from 'mongoose';
import { IProductSaved } from '../dtos/IProduct.dto';

const productSchema = new mongoose.Schema({

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
	stock: {
		type: Number,
		require: true,
		trim: true
	},
	picture: {
		type: String,
		require: true,
		trim: true
	},
	tags: {
		type: [String],
		require: true,
		trim: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		require: true
	}
}, {
	timestamps: true
});
const ProductModel = mongoose.model<IProductSaved>('product', productSchema);
export default ProductModel;
