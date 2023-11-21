
import { Request, Response } from 'express';
import transactionsFacade from '../facades/transactions.facade';
//import { Movement } from '../models/movement';

class TransactionsController {
	public async getTransactions(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.getTransactions(req, res);
	}

	public async createTransaction(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.createTransaction(req, res);
	}

	public async getTransaction(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.getTransaction(req, res);
	}

	//Depende de si se necesita o no, igual en transactions.facade.ts
	/*
	public async deleteTransaction(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.deleteMovement(req, res);
	}

	public async deleteTransaction(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.deleteMovement(req, res);
	}
  */
} export default new TransactionsController();
