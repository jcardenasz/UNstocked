
import { Request, Response } from 'express';
import transactionsFacade from '../facades/transactions.facade';
//import { Movement } from '../models/movement';

class TransactionsController {
	public async getSales(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.getSales(req, res);
	}

	public async getExpenses(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.getExpenses(req, res);
	}

	public async createSale(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.createSale(req, res);
	}

	public async createExpense(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.createExpense(req, res);
	}

	public async getSale(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.getSale(req, res);
	}

	public async getExpense(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.getExpense(req, res);
	}

	public async updateSale(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.updateSale(req, res);
	}

	public async updateExpense(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.updateExpense(req, res);
	}
	//Depende de si se necesita o no, igual en transactions.facade.ts
	/*
	public async updateTransaction(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.updateTransaction(req, res);
	}

	public async deleteTransaction(req: Request, res: Response): Promise<Response> {
		return transactionsFacade.deleteTransaction(req, res);
	}
  */
} export default new TransactionsController();
