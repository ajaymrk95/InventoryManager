import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
         name:{type:String,required:true,unique:true},
         price:{type:Number,required:true,min:0},
         quantity:{type:Number,required:true,min:0},
         categoryID:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true}
    }
)

const Product = mongoose.model("Product",productSchema);

export default Product