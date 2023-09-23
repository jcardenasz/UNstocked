import { Request, Response } from 'express';
import ProductModel from '../models/products.model';
import { IProduct } from '../dtos/IProduct.dto';
import { IUser } from '../dtos/Iuser.dto';
class ProductFacade {
	public async getProducts (req: Request, res: Response): Promise <Response> {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return res.status(401).send('Unauthorized');
		const products = await ProductModel.find({
			userId: currentUser.id
		});//).populate();
		return res.json(products);
	}
	public async createProduct (req: Request, res: Response): Promise<Response> {
		const { name, description,stock, picture,tags }:IProduct = req.body;
		// const existingProduct = await ProductModel.findOne({ name });
		// if (existingProduct !== null) return res.status(500).send('Product already exists');

		const currentUser: IUser | undefined  = req.user as IUser;
		if (currentUser === undefined) return res.status(401).send('Unauthorized');
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
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return res.status(401).send('Unauthorized');
		const product = await ProductModel.find({
			_id: req.params.id,
			userId: currentUser.id
		});
		if (product === null || product.length === 0 ) return res.status(500).send('Product not found');
		return res.json(product);
	}

	public async deleteProduct (req: Request, res: Response): Promise<Response> {
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return res.status(401).send('Unauthorized');
		const product = await ProductModel.find({
			_id:req.params.id,
			userId: currentUser.id
		});
		if (product === null || product.length === 0) return res.status(500).send('Product not found');
		const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
		return res.json(deleteProduct);
		// return res.status(204);
	}

	public async updateProduct (req: Request, res: Response):Promise<Response> {
		const { name, description,stock, picture, tags }:IProduct = req.body;
		const currentUser: IUser | undefined = req.user as IUser;
		if (currentUser === undefined) return res.status(401).send('Unauthorized');
		const product = await ProductModel.find({
			_id:req.params.id,
			userId: currentUser.id
		});
		if (product === null || product.length === 0) return res.status(500).send('Product not found');
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
