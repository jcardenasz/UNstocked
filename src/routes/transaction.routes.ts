import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import  transactionController from "../controllers/transactions.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { saleSchema } from "../schemas/sale.schema";
import { expenseSchema } from "../schemas/expense.schema";

const transactionRouter = Router();

transactionRouter.get("/gSales",authRequired,transactionController.getSales); //SIRVE
transactionRouter.get("/gExpenses",authRequired,transactionController.getExpenses); //SIRVE
transactionRouter.get("/gSale/:id",authRequired,transactionController.getSale); //SIRVE
transactionRouter.get("/gExpense/:id",authRequired,transactionController.getExpense); //SIRVE
transactionRouter.post("/cSale",authRequired,validateSchema(saleSchema),transactionController.createSale); //SIRVE falta cosas
transactionRouter.post("/cExpense",authRequired,validateSchema(expenseSchema),transactionController.createExpense); //SIRVE falta cosas
transactionRouter.put("/uSale/:id",authRequired,validateSchema(saleSchema),transactionController.updateSale); //sin probar
transactionRouter.put("/uExpense/:id",authRequired,validateSchema(expenseSchema),transactionController.updateExpense); //sin probar

export default transactionRouter;