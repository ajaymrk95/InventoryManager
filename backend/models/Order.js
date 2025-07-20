    import mongoose from "mongoose";

    const OrderSchema = new mongoose.Schema(
        {
            productID:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
            userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
            orderprice:{type:Number,required:true,min:0},
            quantity:{type:Number,required:true,min:1},
            status:{type:Boolean,default:null}
            
        },
        {
            timestamps:true
        }
    )

    const Order = mongoose.model("Orders",OrderSchema);

    export default Order 