import {z} from "zod";

export const transactionSchema = z.object({
	name: z.string({
		required_error: 'Name of the transaction is required'
	}).min(2).max(300),
	type: z.string({
		required_error: 'Type of the transaction is required'
	}).min(5).max(1000),
	amount: z.number({
		required_error: 'Amount of the transaction is required'
	}).min(0),
	date: z.date({
		required_error: 'Date of the transaction is required'
	})
});
