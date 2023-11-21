import dotenv from "dotenv";
export class Config{

	private URI: string;
	private PORT: number;
	private JWT_SECRET: string;
	private JWT_REFRESH_SECRET: string;
	private MONGODB_USER: string;
	private MONGODB_PASSWORD: string;
	private FORGOT_PASSWORD_KEY: string;

	constructor() {
		dotenv.config();
		this.MONGODB_USER = process.env.MONGODB_USER || "";
		this.MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
		this.URI = `mongodb+srv://${this.MONGODB_USER}:${this.MONGODB_PASSWORD}@cluster0.ymfpquo.mongodb.net/unstocked?retryWrites=true&w=majority`;
		this.PORT = parseInt(process.env.PORT || "1000",10);
		this.JWT_SECRET = process.env.JWT_SECRET || "";
		this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
		this.FORGOT_PASSWORD_KEY = process.env.FORGOT_PASSWORD_KEY || "";
	}

	public getURI(): string {
		return this.URI;
	}

	public getPORT(): number {
		return this.PORT;
	}

	public getJWT_SECRET(): string {
		return this.JWT_SECRET;
	}
	public getJWT_REFRESH_SECRET(): string {
		return this.JWT_REFRESH_SECRET;
	}
	public getFORGOT_PASSWORD_KEY(): string{
		return this.FORGOT_PASSWORD_KEY;
	}
}

