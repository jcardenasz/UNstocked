import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  productController from "../controllers/products.controller";
// import { validateSchema } from "../middlewares/validator.middleware";
// import { loginSchema, registerSchema,  } from "../schemas/auth.schema";

const productRouter = Router();

productRouter.get("/",authRequired,productController.getProducts);
productRouter.get("/:id",authRequired,productController.getProduct);
productRouter.post("/",authRequired,productController.createProduct);
productRouter.delete("/:id",authRequired,productController.deleteProduct);
productRouter.put("/:id",authRequired,productController.updateProduct);

export default productRouter;
