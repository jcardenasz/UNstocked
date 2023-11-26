import { Request, Response } from 'express';
import businessFacade from '../facades/business.facade';

class BusinessController {
	public async createBusiness(req: Request, res: Response): Promise<Response> {
		return businessFacade.createBusiness(req, res);
	}

	public async getBusiness(req: Request, res: Response): Promise<Response> {
		return businessFacade.getBusiness(req, res);
	}

	public async updateBusiness(req: Request, res: Response): Promise<Response> {
		return businessFacade.updateBusiness(req, res);
	}
}

export default new BusinessController();
