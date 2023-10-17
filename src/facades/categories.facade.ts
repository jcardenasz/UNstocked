import { Request, Response } from 'express';
import CategoryModel from '../models/categories.model';
import { CategoryServices } from '../services/category.services';
import { ICategories } from '../dtos/categories.dto';
class categoriesFacade {
	private readonly categoryServices = new CategoryServices();
	public async getCategories (req: Request, res: Response): Promise <Response> {

		const currentUser = this.categoryServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const category = await CategoryModel.find({
			userId: currentUser.id
		});//).populate();

		return res.json(category);
	}
	public async createCategory (req: Request, res: Response): Promise<Response> {
		const { name, description }:ICategories = req.body;
		const currentUser = this.categoryServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const category = await CategoryModel.find({
			userId: currentUser.id,
			name
		});
		if (category !== null && category.length !== 0) return res.status(500).send('Product already exists');

		const newCategory = new CategoryModel({
			name,
			description,
			userId: currentUser?.id
		});
		const categorySaved = await newCategory.save();
		return res.json(categorySaved);
	}

	public async getCategory (req: Request, res: Response): Promise<Response> {
		const currentUser = this.categoryServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const category = await this.categoryServices.findCategory(req, currentUser);
		if (category === null) return res.status(500).send('Product not found');

		return res.json(category);
	}

	public async deleteCategory (req: Request, res: Response): Promise<Response> {
		const currentUser = this.categoryServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const category = await this.categoryServices.findCategory(req, currentUser);
		if (category === null) return res.status(500).send('Product not found');

		const deleteCategory = await CategoryModel.findByIdAndDelete(req.params.id);
		return res.json(deleteCategory);
		// return res.status(204);
	}

	public async updateCategory (req: Request, res: Response):Promise<Response> {
		const { name, description }:ICategories = req.body;
		const currentUser = this.categoryServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const category = await this.categoryServices.findCategory(req, currentUser);
		if (category === null) return res.status(500).send('Product not found');

		const existingCategory = await CategoryModel.findByIdAndUpdate(req.params.id,{
			name,
			description,
			userId: currentUser.id
		},{
			new: true
		});
		if (existingCategory === null) return res.status(500).send('Product not found');
		return res.json(existingCategory);
	}

} export default new categoriesFacade();
