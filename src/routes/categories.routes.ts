import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  categoriesController from "../controllers/categories.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { categorySchema } from "../schemas/category.schema";

const categoryRouter = Router();

categoryRouter.get("/",authRequired,categoriesController.getCategories);
categoryRouter.get("/:id",authRequired,categoriesController.getCategory);
categoryRouter.post("/",authRequired,validateSchema(categorySchema),categoriesController.createCategory);
categoryRouter.delete("/:id",authRequired,categoriesController.deleteCategory);
categoryRouter.put("/:id",authRequired,validateSchema(categorySchema),categoriesController.updateCategory);

export default categoryRouter;
