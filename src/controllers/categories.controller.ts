import { Request, Response } from 'express';
import  categoriesFacade from '../facades/categories.facade';

class CategoryController {
	public async getCategories (req: Request, res: Response): Promise <Response> {
		return categoriesFacade.getCategories(req, res);
	}

	public  async createCategory(req: Request, res: Response):  Promise<Response> {
		return categoriesFacade.createCategory(req, res);
	}

	public async getCategory (req: Request, res: Response): Promise<Response> {
		return categoriesFacade.getCategory(req, res);
	}

	public async deleteCategory (req: Request, res: Response): Promise<Response> {
		return categoriesFacade.deleteCategory(req, res);
	}

	public async updateCategory (req: Request, res: Response): Promise<Response> {
		return categoriesFacade.updateCategory(req, res);
	}
} export default new CategoryController();
