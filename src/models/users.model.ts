import mongoose from 'mongoose'
import { IUser } from '../dtos/Iuser.dto'

// export interface IUser {
//   username: string
//   email: string
//   password: string
// }

// export interface IUserSaved extends IUser {
//   createdAt: AudioTimestamp
//   updatedAt: AudioTimestamp
// }

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
})
const UserModel = mongoose.model<IUser>('User', userSchema)
export default UserModel
