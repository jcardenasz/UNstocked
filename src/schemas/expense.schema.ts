import {z} from "zod";

export const expenseSchema = z.object({
	name: z.string({
		required_error: 'Name of the transaction is required'
	}).min(2).max(300),
	description: z.string({
		required_error: 'Description of the transaction is required'
	}).min(2).max(300),
	paymentMethod: z.string({
		required_error: 'Payment method of the transaction is required'
	}).min(2).max(30),
	/*date: z.date({
		required_error: 'Date of the transaction is required'
	}),*/
	supplier: z.string({
		required_error: 'Supplier of the transaction is required'
	}).min(2).max(30),
	expenseAmount: z.number({
		required_error: 'Amount of the transaction is required'
	}).int().min(0)
});
