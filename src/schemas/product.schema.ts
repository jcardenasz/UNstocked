import {z} from "zod";

export const productSchema = z.object({
	name: z.string({
		required_error: 'Name of the product is required'
	}).min(2).max(300),
	description: z.string({
		required_error: 'Description of the product is required'
	}).min(5).max(1000),
	stock: z.number({
		required_error: "Stock is required"
	}).int().nonnegative(),
	picture: z.string({
		required_error: 'Link is required'
	}).url({
		message: 'Link is not valid'
	}),
	price: z.number({
		required_error: "Price is required"
	}).int().nonnegative(),
});
