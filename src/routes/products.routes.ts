import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  productController from "../controllers/products.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { productSchema } from "../schemas/product.schema";

const productRouter = Router();

productRouter.get("/",authRequired("refresh"),productController.getProducts);
productRouter.get("/:id",authRequired("refresh"),productController.getProduct);
productRouter.post("/",authRequired("refresh"),validateSchema(productSchema),productController.createProduct);
productRouter.delete("/:id",authRequired("refresh"),productController.deleteProduct);
productRouter.put("/:id",authRequired("refresh"),validateSchema(productSchema),productController.updateProduct);

export default productRouter;
