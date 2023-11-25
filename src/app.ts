import express, { Application } from 'express';
import morgan from 'morgan';
import authrouter from './routes/auth.routes';
import productsRoutes from './routes/products.routes';
import categoriesRoutes from './routes/categories.routes';
import transactionRoutes from './routes/transaction.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';


export class App {
	private readonly app: Application;
	constructor() {
		this.app = express();
		this.initMiddlewares();
		this.initRoutes();
	}

	private initMiddlewares(): void {
		this.app.use(morgan('dev'));
		this.app.use(cors({
			origin: 'http://localhost:3000', // replace with your frontend origin
			methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
		}));
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(cookieParser());
	}

	private initRoutes(): void {
		this.app.use('/api', authrouter);
		this.app.use('/api/products', productsRoutes);
		this.app.use('/api/categories', categoriesRoutes);
		this.app.use('/api/transactions', transactionRoutes);
	}

	public getApp(): Application {
		return this.app;
	}
}
