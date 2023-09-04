import mongoose from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
}

export interface IUserSaved extends IUser {
  createdAt: AudioTimestamp
  updatedAt: AudioTimestamp
}

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
export default mongoose.model<IUserSaved>('User', userSchema)
