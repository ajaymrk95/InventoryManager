import mongoose from "mongoose"
import dotenv from "dotenv"
 
dotenv.config()

const dbConnect = async ()=>
{
   try {
     
      mongoose.connect(process.env.URI)
      console.log("Connected to MongoDB")

   } 
   catch (error) 
   {
      console.log("Error in Connecting\n", error.message)
   }



}

export default dbConnect