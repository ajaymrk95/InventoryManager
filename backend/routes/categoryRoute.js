import express from "express"
import { addCategory,getCategories,deleteCategory} from "../controllers/categoryController.js";

const catRouter = express.Router();

catRouter.get("/",getCategories);

catRouter.post("/add",addCategory);

catRouter.delete("/delete/:id",deleteCategory)

export default catRouter