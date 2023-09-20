import {z} from "zod";

export const registerSchema = z.object({
	username: z.string({
		required_error: 'Username is required'
	}).min(2).max(100),
	email: z.string({
		required_error: 'Email is required'
	}).email({
		message: 'Email is not valid'
	}),
	password: z.string({
		required_error: 'Password is required'
	}).min(6,{
		message: 'Password must be at least 6 characters'
	}).max(100),
});
export const loginSchema = z.object({
	email: z.string({
		required_error: 'Email is required'
	}).email({
		message: 'Email is not valid'
	}),
	password: z.string({
		required_error: 'Password is required'
	}).min(6,{
		message: 'Password must be at least 6 characters'
	}).max(100),
});