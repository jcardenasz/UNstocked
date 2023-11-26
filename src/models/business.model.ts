import mongoose from "mongoose";
import { IBusinessSaved } from "../dtos/Ibusiness.dto";

const businessSchema = new mongoose.Schema({
	name : {
		type: String,
		require: true,
		trim: true,
	},
	type : {
		type: String,
		require: true,
		trim: true,
	},
	address : {
		type: String,
		require: true,
		trim: true,
	},
	city : {
		type: String,
		require: true,
		trim: true,
	},
	email : {
		type: String,
		require: true,
		trim: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		require: true
	}
}, {
	timestamps: true
});
const BusinessModel = mongoose.model<IBusinessSaved>('Business', businessSchema);
export default BusinessModel;

