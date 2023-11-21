
import { Request, Response } from 'express';
import TransactionModel from '../models/transactions.model';
import { TransactionServices } from '../services/transaction.services';
import { ITransaction } from '../dtos/Itransactions.dto';

class TransactionFacade {
	private readonly transactionServices = new TransactionServices();
	public async getTransactions(req: Request, res: Response): Promise<Response> {

		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transactions = await TransactionModel.find({
			userId: currentUser.id,
		});

		return res.json(transactions);
	}

	public async createTransaction(req: Request, res: Response): Promise<Response> {
		const { name, type, amount, date }:ITransaction = req.body;
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transactions = await TransactionModel.find({
			userId: currentUser.id,
			name
		});

		if (transactions !== null && transactions.length !== 0) return res.status(500).send('Transaction already exists');

		const newTransaction = new TransactionModel({
			name,
			type,
			amount,
			date,
			userId: currentUser?.id,
		});
		const savedTransaction = await newTransaction.save();
		return res.json(savedTransaction);
	}

	public async getTransaction(req: Request, res: Response): Promise<Response> {
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transaction = await this.transactionServices.findTransaction(req, currentUser);
		if (transaction === null) return res.status(500).send('Transaction not found');

		return res.json(transaction);
	}

	//no sé si es necesario para transacciones.
	/*
  public async deleteTransaction(req: Request, res: Response): Promise<Response> {
	}

  public async updateTransaction(req: Request, res: Response): Promise<Response> {
	}
  */


} export default new TransactionFacade();
