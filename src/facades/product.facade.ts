import { Request, Response } from 'express';
import ProductModel from '../models/products.model';
import { IProduct } from '../dtos/IProduct.dto';
import { ProductServices } from '../services/product.services';
class ProductFacade {
	private readonly productServices = new ProductServices();
	public async getProducts (req: Request, res: Response): Promise <Response> {

		const currentUser = this.productServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const products = await ProductModel.find({
			userId: currentUser.id
		});//).populate();

		return res.json(products);
	}
	public async createProduct (req: Request, res: Response): Promise<Response> {
		const { name, description,stock, picture,tags }:IProduct = req.body;
		const currentUser = this.productServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const products = await ProductModel.find({
			userId: currentUser.id,
			name
		});
		if (products !== null && products.length !== 0) return res.status(500).send('Product already exists');

		const newProduct = new ProductModel({
			name,
			description,
			stock,
			picture,
			tags,
			userId: currentUser?.id
		});
		const productSaved = await newProduct.save();
		return res.json(productSaved);
	}

	public async getProduct (req: Request, res: Response): Promise<Response> {
		const currentUser = this.productServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const product = await this.productServices.findProduct(req, currentUser);
		if (product === null) return res.status(500).send('Product not found');

		return res.json(product);
	}

	public async deleteProduct (req: Request, res: Response): Promise<Response> {
		const currentUser = this.productServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const product = await this.productServices.findProduct(req, currentUser);
		if (product === null) return res.status(500).send('Product not found');

		const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
		return res.json(deleteProduct);
		// return res.status(204);
	}

	public async updateProduct (req: Request, res: Response):Promise<Response> {
		const { name, description,stock, picture, tags }:IProduct = req.body;
		const currentUser = this.productServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const product = await this.productServices.findProduct(req, currentUser);
		if (product === null) return res.status(500).send('Product not found');

		const existingProduct = await ProductModel.findByIdAndUpdate(req.params.id,{
			name,
			description,
			stock,
			picture,
			tags,
			userId: currentUser.id
		},{
			new: true
		});
		if (existingProduct === null) return res.status(500).send('Product not found');
		return res.json(existingProduct);
	}

} export default new ProductFacade();
