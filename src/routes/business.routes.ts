import { Router } from 'express';
import { authRequired } from '../middlewares/validateUser.middlewares';
import businessController from '../controllers/business.controller';
import { validateSchema } from '../middlewares/validator.middleware';
import { businessSchema } from '../schemas/business.schema';

const businessRouter = Router();

businessRouter.get('/', authRequired,businessController.getBusiness);
businessRouter.post('/', authRequired,validateSchema(businessSchema),businessController.createBusiness);
businessRouter.put('/:id', authRequired,businessController.updateBusiness);

export default businessRouter;
