import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnect from "./dbConnect.js";
import registerController from "./controllers/registerController.js";
import loginController from "./controllers/loginController.js";
import refreshTokenController from "./controllers/refreshTokenController.js"
import handleLogout from "./controllers/handleLogout.js";
import cookieParser from "cookie-parser"
import verifyJWT from "./middleware/verifyJWT.js";
import catRouter from "./routes/categoryRoute.js";
import prodRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
app.use(cookieParser())
app.use(express.json());

app.use(cors( {origin: "http://localhost:5173" , credentials: true, allowedHeaders: ["Content-Type", "Authorization"] } ));


app.listen(process.env.PORT, async ()=>
{
     try    
     {   
         await dbConnect()
         console.log("Server Running on Port 5000")
         
     } 
     
     catch (error) 
     {
         console.log(error)
     }
})

app.post("/register",registerController)
app.post("/login",loginController);

app.get("/refresh",refreshTokenController);
app.get("/logout",handleLogout);

app.use(verifyJWT);

app.use("/api/category", catRouter);
app.use("/api/products", prodRouter);

app.use("/api/orders",orderRouter)

