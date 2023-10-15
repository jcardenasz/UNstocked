export class ServerError extends Error {
	private readonly status: number;
	constructor(message:string, status:number) {
		super(message);
		this.status = status;
		this.message = message;
	}
	public getStatus(): number {
		return this.status;
	}
}