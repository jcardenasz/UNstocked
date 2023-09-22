import mongoose from 'mongoose';
import {Config} from './config/config';

const config = new Config;
export const connectDB = async (): Promise<void> => {
	await mongoose.connect(config.getURI());
	console.log('DB is connected');
};

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('Mongodb connection established');
});

connection.on('error', (err) => {
	console.log(err);
	throw new Error("DataBase down");
});
