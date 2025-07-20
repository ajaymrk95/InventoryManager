import React from "react";
import { useState,useEffect } from "react";
import axios from "axios"

const ProductForm = () => {

  const [productName,setProductName] = useState("")
  const [productPrice,setProductPrice]  = useState(0);
  const [productQuantity,setProductQuantity]  = useState(0);
  const [allProducts,setAllProducts] = useState([]);

  const [categories,setCategories] = useState([]);
  const [selectedcat,setSelectedCat] = useState("");
  

    const fetchCategories = async () => {
    try {
       
      const auth = JSON.parse(localStorage.getItem("auth"));
      const acctoken = auth?.token;

    if (!acctoken) return console.warn("No token, not fetching categories.");

      const response = await axios.get("http://localhost:5000/api/category", {
        headers: {
          Authorization: `Bearer ${acctoken}`,
        },
      });

      if (response.data.success) {
        setCategories(response.data.categories); 
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };


  const handleSubmit = async (e)=>
  {
      e.preventDefault();

     
      const auth = JSON.parse(localStorage.getItem("auth"));
      const acctoken = auth?.token;
      const response = await axios.post("http://localhost:5000/api/products/add",{name:productName,price:productPrice,quantity:productQuantity,categoryID:selectedcat},
        {
            headers:
            {
                Authorization:`Bearer ${acctoken}`
            }
        }
      );
      
      if (response.data.success)
      {  
         alert("Product Added Successfully")
         console.log('Product Added Successfully',response.data);

         
         setProductName("");
         setProductPrice(0);
         setProductQuantity(0);
         setSelectedCat("");
            
       
      }

      else
      {
         alert("Error Adding Product");
         console.error("Error Adding Product")
         
      }
      
  }

      useEffect(() => {
  
    fetchCategories(); 
  }, []);


  return (
    <>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Add Product</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex-1">
              <label htmlFor="prodname" className="font-bold mr-4">
                Product Name:
              </label>
              <input
                type="text"
                id="prodname"
                placeholder="Product Name"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </div>

            <div>
              <label htmlFor="prodprice" className="font-bold mr-4">
                Product Price:
              </label>
              <input
                type="number"
                min="0"
                id="prodprice"
                placeholder="0"
                onChange={(e) => setProductPrice(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                value={productPrice}
              />
            </div>

            <div>
              <label htmlFor="prodquantity" className="font-bold mr-4">
                Product Quantity:
              </label>
              <input
                type="number"
                min="0"
                id="prodquantity"
                placeholder="0"
                onChange={(e) => setProductQuantity(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                value={productQuantity}
              />
            </div>

            <div>
              <label htmlFor="section" className="text-sm font-bold mr-4 text-gray-700">
                Select Section
              </label>
              <select
                id="section"
                value={selectedcat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="">-- Select a Category --</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition duration-400"
            >
              Add Product
            </button>
          </form>
        </div>
    </>
  );
};

export default ProductForm;
