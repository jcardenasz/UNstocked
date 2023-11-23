
import { Request, Response } from 'express';
import SaleModel from '../models/sale.model';
import ExpenseModel from '../models/expense.model';
import { TransactionServices } from '../services/transaction.services';
import { IExpense, ISale } from '../dtos/Itransactions.dto';

class TransactionFacade {
	private readonly transactionServices = new TransactionServices();
	public async getSales(req: Request, res: Response): Promise<Response> {

		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const sales = await SaleModel.find({
			userId: currentUser.id,
		});

		return res.json(sales);
	}

	public async getExpenses(req: Request, res: Response): Promise<Response> {

		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const expenses = await ExpenseModel.find({
			userId: currentUser.id,
		});

		return res.json(expenses);
	}

	public async createSale(req: Request, res: Response): Promise<Response> {
		const { name, description, paymentMethod, date, saleAmount }:ISale = req.body;
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transaction = await SaleModel.find({
			_id: req.params.id,
		});

		if (transaction !== null && transaction.length !== 0) return res.status(500).send('This sale already exists');

		const newSale = new SaleModel({
			name,
			description,
			paymentMethod,
			date,
			saleAmount,
			userId: currentUser?.id,
		});
		const savedTransaction = await newSale.save();
		return res.json(savedTransaction);
	}

	public async createExpense(req: Request, res: Response): Promise<Response> {
		const { description, paymentMethod, date, name, supplier, expenseAmount  }:IExpense = req.body;
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transaction = await ExpenseModel.find({
			_id: req.params.id,
		});

		if (transaction !== null && transaction.length !== 0) return res.status(500).send('This expense already exists');

		const newTransaction = new ExpenseModel({
			description,
			paymentMethod,
			date,
			name,
			supplier,
			expenseAmount,
			userId: currentUser?.id,
		});
		const savedExpense = await newTransaction.save();
		return res.json(savedExpense);
	}

	public async getSale(req: Request, res: Response): Promise<Response> {
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transaction = await this.transactionServices.findSale(req, currentUser);
		if (transaction === null) return res.status(500).send('Sale not found');

		return res.json(transaction);
	}

	public async getExpense(req: Request, res: Response): Promise<Response> {
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transaction = await this.transactionServices.findExpense(req, currentUser);
		if (transaction === null) return res.status(500).send('Expense not found');

		return res.json(transaction);
	}

	public async updateSale(req: Request, res: Response): Promise<Response> {
		const { description, paymentMethod, date, saleAmount }:ISale = req.body;
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const product = await this.transactionServices.findSale(req, currentUser);
		if (product === null) return res.status(500).send('Product not found');

		const existingSale = await SaleModel.updateOne({_id: req.params.id},{
			description,
			paymentMethod,
			date,
			saleAmount,
			userId: currentUser.id
		},{
			new: true
		});
		if (existingSale === null) return res.status(500).send('Sale not found');
		return res.json(existingSale);
	}

	public async updateExpense(req: Request, res: Response): Promise<Response> {
		const { description, paymentMethod, date, name, supplier, expenseAmount  }:IExpense = req.body;
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const expense = await this.transactionServices.findExpense(req, currentUser);
		if (expense === null) return res.status(500).send('Expense not found');

		const existingExpense = await SaleModel.updateOne({_id: req.params.id},{
			description,
			paymentMethod,
			date,
			name,
			supplier,
			expenseAmount,
			userId: currentUser.id
		},{
			new: true
		});
		if (existingExpense === null) return res.status(500).send('Sale not found');
		return res.json(existingExpense);
	}
	//No es necesario borrar una transacción
	/*
  	public async deleteTransaction(req: Request, res: Response): Promise<Response> {
		const currentUser = this.transactionServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const transaction = await this.transactionServices.findSale(req, currentUser);
		if (transaction === null) return res.status(500).send('Transaction not found');

		const deletedTransaction = await SaleModel.deleteOne({ _id: req.params.id });
		if (deletedTransaction === null) return res.status(500).send('Transaction not found');
		return res.json(deletedTransaction);
	}
	*/
} export default new TransactionFacade();
