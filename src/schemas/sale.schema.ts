import {z} from "zod";

export const saleSchema = z.object({
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
	saleAmount: z.number({
		required_error: 'Amount of the Sale is required'
	}).int().min(0)
});
