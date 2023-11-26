import {z} from "zod";

export const businessSchema = z.object({
	name: z.string({
		required_error: 'Name is required'
	}).min(5).max(100),
	type: z.string({
		required_error: 'Type is required'
	}).min(5).max(100),
	address: z.string({
		required_error: 'Address is required'
	}).min(5).max(100),
	city: z.string({
		required_error: 'City is required'
	}).min(5).max(100),
	email: z.string({
		required_error: 'Email is required'
	}).email({
		message: 'Email is not valid'
	}),
});
