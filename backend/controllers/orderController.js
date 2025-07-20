import Order from "../models/Order.js";
import User from "../models/User.js";

export const getOrders = async(req,res)=>
{
     try 
     {
         const orders = await Order.find().populate("userID", "username").populate("productID","name");
         
         return res.status(200).json({success:true,orders})
     } 
     
     catch (error) 
     {
         console.error("Error Fetching Orders",error);
         return res.status(500).json({success:false});
     } 
}


export const getOrdersByUser = async (req, res) => {
  try {
    const username = req.user; 

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" });

    const userOrders = await Order.find({ userID: user._id })
      .populate("productID", "name"); 

    return res.status(200).json({ success: true, userOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false });
  }
};


export const AddOrder = async (req, res) => {
  try {
    const { product_id, orderprice, orderquantity } = req.body;

    if (!product_id || !orderprice || !orderquantity)
      return res.status(400).json({ success: false, message: "Missing order details" });

  
    const user = await User.findOne({ username: req.user });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const newOrder = new Order({
      productID: product_id,
      userID: user._id,
      orderprice,
      quantity: orderquantity,
    });

    await newOrder.save();

    return res.status(200).json({ success: true, message: "Order placed successfully" });
  } 
  catch (error) 
  {
    console.error("Error placing order:", error);
    return res.status(500).json({ success: false });
  }
};
