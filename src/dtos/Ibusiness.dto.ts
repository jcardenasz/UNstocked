import { ObjectId } from 'mongoose';

export interface IBusiness {
  id: ObjectId;
  name: string;
  type: string;
  address: string;
  city: string;
  email: string;
}

export interface IBusinessSaved extends IBusiness {
    createdAt: AudioTimestamp
    updatedAt: AudioTimestamp
}
