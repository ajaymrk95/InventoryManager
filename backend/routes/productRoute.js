import express from "express"
import {addProduct,getProducts,deleteProduct,updateProduct} from "../controllers/productController.js";

const prodRouter = express.Router();

prodRouter.get("/",getProducts);

prodRouter.post("/add",addProduct);

prodRouter.delete("/delete/:id",deleteProduct)

prodRouter.patch("/update/:id",updateProduct)

export default prodRouter