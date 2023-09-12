export default {
	JWTSECRET: process.env.JWT_SECRET ?? 'secretToken',
	DB: {
		// URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/unstocked',
		URI: process.env.MONGODB_URI ?? "mongodb+srv://Buzz:tnDYvytyXs1djsFK@cluster0.ymfpquo.mongodb.net/?retryWrites=true&w=majority",
		USER: process.env.MONGODB_USER ?? "Buzz",
		PASSWORD: process.env.MONGODB_PASSWORD ?? "tnDYvytyXs1djsFK"
	},
	port: process.env.PORT ?? 4000
};
