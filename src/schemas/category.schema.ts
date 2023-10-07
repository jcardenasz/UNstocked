import {z} from "zod";

export const categorySchema = z.object({
	name: z.string({
		required_error: 'Name of the category is required'
	}).min(2).max(300),
	description: z.string({
		required_error: 'Description of the category is required'
	}).min(5).max(1000)
});
