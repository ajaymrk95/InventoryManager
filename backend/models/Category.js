import mongoose from "mongoose"

const categorySchema  = new mongoose.Schema(
{
    name:{type:String,unique:true,required:true},
    description:{type:String}
})

const Category = mongoose.model("Category",categorySchema);

export default Category