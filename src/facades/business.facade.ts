import { Request, Response } from 'express';
import { BusinessServices } from '../services/business.services';
import BusinessModel from '../models/business.model';
import { IBusiness } from '../dtos/Ibusiness.dto';

class BusinessFacade {
	private readonly businessServices = new BusinessServices();
	public async getBusiness (req: Request, res: Response): Promise <Response> {

		const currentUser = this.businessServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const business = await BusinessModel.find({
			userId: currentUser.id
		});

		return res.json(business);
	}
	public async createBusiness (req: Request, res: Response): Promise<Response> {
		const { name, type, address, city, email }:IBusiness = req.body;
		const currentUser = this.businessServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const business = await BusinessModel.find({
			userId: currentUser.id,
			name
		});
		if (business !== null && business.length !== 0) return res.status(500).send('Business already exists');

		const newBusiness = new BusinessModel({
			name,
			type,
			address,
			city,
			email,
			userId: currentUser?.id
		});
		const businessSaved = await newBusiness.save();
		return res.json(businessSaved);
	}

	public async updateBusiness (req: Request, res: Response):Promise<Response> {
		const { name, type, address, city, email }:IBusiness = req.body;
		const currentUser = this.businessServices.validateUser(req);
		if (currentUser === null) return res.status(401).send('Unauthorized');

		const business = await this.businessServices.findBusiness(req, currentUser);
		if (business === null) return res.status(500).send('Business not found');

		const existingBusiness = await BusinessModel.updateOne({_id:req.params.id},{
			name,
			type,
			address,
			city,
			email,
			userId: currentUser.id
		},{
			new: true
		});
		if (existingBusiness === null) return res.status(500).send('Business not found');
		return res.json(existingBusiness);
	}
} export default new BusinessFacade();
