import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IPayLoad{
  id: ObjectId
  email: string
  type:"access" | "refresh"
}

export type IPayLoadToken = JwtPayload & IPayLoad