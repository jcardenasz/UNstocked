import { Request, Response } from 'express';
import ProductModel from '../models/products.model';
import { IProduct } from '../dtos/IProduct.dto';
import { IUser, IUserSaved } from '../dtos/Iuser.dto';
class ProductFacade {
	public async getProducts (_req: Request, res: Response): Promise <Response> {
		const products = await ProductModel.find();
		return res.json(products);
	}
	public async createProduct (req: Request, res: Response): Promise<Response> {
		const { name, description,stock, picture,tags }:IProduct = req.body;
		const existingProduct = await ProductModel.findOne({ name });
		if (existingProduct !== null) return res.status(500).send('Product already exists');

		let currentUser: IUser | undefined = undefined;
		if (req.user) {
			currentUser = req.user as IUser;
		}
		console.log(currentUser?._id);
		const newProduct = new ProductModel({
			name,
			description,
			stock,
			picture,
			tags,
			user: "currentUser?._id ?? undefined"
		});
		const productSaved = await newProduct.save();
		return res.json(productSaved);
	}

	public async getProduct (req: Request, res: Response): Promise<Response> {
		const product = await ProductModel.findById(req.params.id);
		if (product === null) return res.status(500).send('Product not found');
		return res.json(product);
	}

	public async deleteProduct (req: Request, res: Response): Promise<Response> {
		const product = await ProductModel.findByIdAndDelete(req.params.id);
		if (product === null) return res.status(500).send('Product not found');
		return res.json(product);
	}

	public async updateProduct (req: Request, res: Response):Promise<Response> {
		const { name, description,stock, picture,tags  }:IProduct = req.body;
		let user: IUserSaved | undefined = undefined;
		if (req.user) {
			user = req.user as IUserSaved;
		}
		const existingProduct = await ProductModel.findByIdAndUpdate(req.params.id,{
			name,
			description,
			stock,
			picture,
			tags,
			user: user?._id ?? undefined
		},{
			new: true
		});
		if (existingProduct === null) return res.status(500).send('Product not found');
		return res.json(existingProduct);
	}

} export default new ProductFacade();
