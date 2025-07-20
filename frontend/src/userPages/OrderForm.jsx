import React from "react";
import { useState,useEffect } from "react";
import axios from "axios"

const OrderForm = ({product_id,productname,product_price,productquantity,userid,setOrder}) => {

  const [productName,setProductName] = useState(productname)
  const [productID,setProductID] = useState(product_id)
  const [userID,setUserID] = useState(userid)

  const [orderPrice,setOrderPrice]  = useState(0);
  const [OrderQuantity,setOrderQuantity]  = useState(0);

 

  const handleSubmit = async (e)=>
  {
      e.preventDefault();

        if (OrderQuantity > productquantity) {
        alert(`Cannot order more than available quantity (${productquantity})`);
        return;
      }

     
      const auth = JSON.parse(localStorage.getItem("auth"));
      const acctoken = auth?.token;
      
      const response = await axios.post("http://localhost:5000/api/orders/add",{product_id:productID,orderprice:orderPrice,orderquantity:OrderQuantity},
        {
           headers:{Authorization:`Bearer ${acctoken}`}
        }
      )
      
      if (response.data.success)
      {  
         alert("Order Added Successfully")
         console.log('Order Added Successfully',response.data);

         
        setOrderQuantity(0);
        setOrderPrice(0);
        setOrder(false);
        
            
       
      }

      else
      {
         alert("Error Adding Product");
         console.error("Error Adding Product")
         
      }
      
  }


  return (
    <>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Order for {productName}</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex-1">
              <label htmlFor="orderquantity" className="font-bold mr-4">
                Order Quantity:
              </label>
              <input
                type="number"
                min="1"
                id="orderquantity"
                placeholder="1"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                onChange={(e) => { setOrderQuantity(e.target.value)
                  setOrderPrice(e.target.value*product_price)
                 }}
              
                value={OrderQuantity}
              />
            </div>

          
           <h1 className="text-xl font-semibold text-green-700">
              Price: ₹{orderPrice}
            </h1>

            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition duration-400"
            >
              Order Product
            </button>

            <button
              onClick={()=>{setOrder(false)}}
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition duration-400"
            >
              Cancel
            </button>
          </form>
        </div>
    </>
  );
};

export default OrderForm;