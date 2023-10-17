import { ObjectId } from 'mongoose';
import { IProduct } from './IProduct.dto';

export interface ICategories {
  id: ObjectId
  name: string
  description: string
  products: IProduct[]
  userId: ObjectId
}
export interface ICategoriesSaved extends ICategories {
  createdAt: AudioTimestamp
  updatedAt: AudioTimestamp
}
