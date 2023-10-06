import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  productController from "../controllers/products.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { productSchema } from "../schemas/product.schema";

const productRouter = Router();

productRouter.get("/",authRequired,productController.getProducts);
productRouter.get("/:id",authRequired,productController.getProduct);
productRouter.post("/",authRequired,validateSchema(productSchema),productController.createProduct);
productRouter.delete("/:id",authRequired,productController.deleteProduct);
productRouter.put("/:id",authRequired,validateSchema(productSchema),productController.updateProduct);

export default productRouter;
