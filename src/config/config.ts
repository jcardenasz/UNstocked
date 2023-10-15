import dotenv from "dotenv";
export class Config{

	private URI: string;
	private PORT: number;
	private JWT_SECRET: string;
	private JWT_REFRESH_SECRET: string;
	private MONGODB_USER: string;
	private MONGODB_PASSWORD: string;
	private JWT_ISSUER: string;
	private JWT_AUDIENCE: string;
	private JWT_EXPIRES_ACCESS: string;
	private JWT_EXPIRES_REFRESH: string;

	constructor() {
		dotenv.config();
		this.MONGODB_USER = process.env.MONGODB_USER || "";
		this.MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
		this.URI = `mongodb+srv://${this.MONGODB_USER}:${this.MONGODB_PASSWORD}@cluster0.ymfpquo.mongodb.net/?retryWrites=true&w=majority`;
		this.PORT = parseInt(process.env.PORT || "1000",10);
		this.JWT_SECRET = process.env.JWT_SECRET || "";
		this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
		this.JWT_ISSUER = process.env.JWT_ISSUER || "";
		this.JWT_AUDIENCE = process.env.JWT_AUDIENCE || "";
		this.JWT_EXPIRES_ACCESS = "15m";
		this.JWT_EXPIRES_REFRESH = "48h";
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

	public getJWT_ISSUER():string{
		return this.JWT_ISSUER;
	}

	public getJWT_AUDIENCE():string{
		return this.JWT_AUDIENCE;
	}

	public getJWT_EXPIRES_ACCESS():string{
		return this.JWT_EXPIRES_ACCESS;
	}

	public getJWT_EXPIRES_REFRESH():string{
		return this.JWT_EXPIRES_REFRESH;
	}
}

