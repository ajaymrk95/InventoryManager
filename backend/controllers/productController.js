import Product from "../models/Products.js";

export const getProducts = async(req,res)=>
{
     try {
        
        const products = await Product.find().populate("categoryID");

        return  res.status(200).json({success:true,products})
     
    } 
     
     catch (error) 
     {
        console.error("Error fetching Products:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"})
     }

}

export const addProduct = async (req,res) =>
{
    try 
    {
        const {name,price,quantity,categoryID} = req.body;

        if(!name || !price || !quantity || !categoryID)
             return res.status(400).json({success:false,message:"Missing Product Data"});
        
        const checkProductExist = await Product.findOne({name:name})
        
             if(checkProductExist)
                
                return res.status(409).json({success:false,message : "Product Already Exists"})

    

        const newProduct = new Product({name,price,quantity,categoryID})

        await newProduct.save();

        console.log("New Product Added!")

        return res.status(201).json({success:true,message:`Product ${name} Added Successfully`})
    } 
    
    catch (error) 
    {
        console.error("Error adding Product:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"})    
    }
}


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productToDelete = await Product.findById(id);

    if (!productToDelete) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: `Product "${productToDelete.name}" deleted successfully` });

  } catch (error) {
    console.error("Error Deleting Product:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const {price,quantity} = req.body;
    
    console.log(id,price,quantity);
    const productToUpdate = await Product.findById(id);

    if (!productToUpdate) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    productToUpdate.price=price;
    productToUpdate.quantity=quantity;

    await productToUpdate.save();

    return res.status(200).json({ success: true, message: `Product "${productToUpdate.name}" Updated successfully` });

  } catch (error) {
    console.error("Error Updating Product:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
