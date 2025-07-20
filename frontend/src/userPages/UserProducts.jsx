import React, { useState, useEffect } from 'react';
import axios from "axios";
import OrderForm from './OrderForm';

const UserProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));

      const res = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });

      if (res.data.success) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  return (
    <>
      {showOrderForm && selectedProduct && (
        <OrderForm
          product_id={selectedProduct._id}
          productname={selectedProduct.name}
          product_price={selectedProduct.price}
          productquantity={selectedProduct.quantity}
          userid={JSON.parse(localStorage.getItem("auth"))?.user?._id}
          setOrder={setShowOrderForm}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((p) => (
          <div key={p._id} 
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center space-y-3"
            >
            

            <img className="w-2/3 h-2/3 object-cover rounded-md mb-2" src='/image-equilibrium.jpg'></img>
            <h3 className="font-semibold">{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Quantity: {p.quantity}</p>

            <div className="mt-2 space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  setSelectedProduct(p);
                  setShowOrderForm(true);
                }}
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserProducts;
