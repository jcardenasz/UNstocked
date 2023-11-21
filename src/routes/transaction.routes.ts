import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  transactionController from "../controllers/transactions.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { transactionSchema } from "../schemas/transaction.schema";

const productRouter = Router();

productRouter.get("/",authRequired,transactionController.getTransactions);
productRouter.get("/:id",authRequired,transactionController.getTransaction);
productRouter.post("/",authRequired,validateSchema(transactionSchema),transactionController.createTransaction);
/*//Aquí está si es necesario
productRouter.delete("/:id",authRequired,productController.deleteProduct);
productRouter.put("/:id",authRequired,validateSchema(productSchema),productController.updateProduct);
*/
export default productRouter;