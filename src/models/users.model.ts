import mongoose from 'mongoose';
import { IUserSaved } from '../dtos/Iuser.dto';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		trim: true
	},
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	}
	
}, {
	timestamps: true
});
const UserModel = mongoose.model<IUserSaved>('users', userSchema);
export default UserModel;
