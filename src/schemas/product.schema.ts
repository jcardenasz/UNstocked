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
	tags: z.array(z.string({
		required_error: 'Tags is required'
	}).min(2).max(20)).min(1, {
		message: 'Must have at least 1 tag'
	}).max(15, {
		message: 'Must have at most 10 tags'
	})
});
