import mongoose from 'mongoose';
import config from './config/config';

export const connectDB = async (): Promise<void> => {
	await mongoose.connect(config.URI);
	console.log('DB is connected');
};

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('Mongodb connection established');
});

connection.on('error', (err) => {
	console.log(err);
	// console.log('DataBase down');
	throw new Error("DataBase down");
});
