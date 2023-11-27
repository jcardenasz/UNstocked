import { ObjectId } from 'mongoose';

export interface IProduct {
  _id?: ObjectId
  name: string
  description: string
  stock: number
  picture: string
  price: number
  category: string
  userId: ObjectId
}
export interface IProductSaved extends IProduct {
  createdAt: AudioTimestamp
  updatedAt: AudioTimestamp
}
