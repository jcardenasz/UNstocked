import { Request, Response } from 'express';
import productFacade from '../facades/product.facade';

class ProductController {
	public async getProducts (req: Request, res: Response): Promise <Response> {
		return productFacade.getProducts(req, res);
	}

	public  async createProduct(req: Request, res: Response):  Promise<Response> {
		return productFacade.createProduct(req, res);
	}

	public async getProduct (req: Request, res: Response): Promise<Response> {
		return productFacade.getProduct(req, res);
	}

	public async deleteProduct (req: Request, res: Response): Promise<Response> {
		return productFacade.deleteProduct(req, res);
	}

	public async updateProduct (req: Request, res: Response): Promise<Response> {
		return productFacade.updateProduct(req, res);
	}
} export default new ProductController();
