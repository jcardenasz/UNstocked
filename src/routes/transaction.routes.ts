import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  transactionController from "../controllers/transactions.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { saleSchema } from "../schemas/sale.schema";
import { expenseSchema } from "../schemas/expense.schema";

const transactionRouter = Router();

transactionRouter.get("/gSales",authRequired,transactionController.getSales);
transactionRouter.get("/gExpenses",authRequired,transactionController.getExpenses);
transactionRouter.get("/gSale:id",authRequired,transactionController.getSale);
transactionRouter.get("/gExpense:id",authRequired,transactionController.getExpense);
transactionRouter.post("/cSale",authRequired,validateSchema(saleSchema),transactionController.createSale);
transactionRouter.post("/cExpense",authRequired,validateSchema(expenseSchema),transactionController.createExpense);
transactionRouter.patch("/uSale:id",authRequired,validateSchema(saleSchema),transactionController.updateSale);
transactionRouter.patch("/uExpense:id",authRequired,validateSchema(expenseSchema),transactionController.updateExpense);

export default transactionRouter;