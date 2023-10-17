import mongoose from 'mongoose';
import { ICategoriesSaved } from '../dtos/Icategories.dto';


const categorySchema = new mongoose.Schema({

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
	products: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "ProductModel",
		require: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		require: true
	}
}, {
	timestamps: true
});
const CategoryModel = mongoose.model<ICategoriesSaved>('Category', categorySchema);
export default CategoryModel;
