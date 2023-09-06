import { ObjectId } from 'mongoose'

export interface IUser {
  _id?: ObjectId
  username: string
  email: string
  password: string
}
export interface IUserSaved extends IUser {
  createdAt: AudioTimestamp
  updatedAt: AudioTimestamp
}
