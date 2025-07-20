import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

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

      if (res.data.success)
        setAllProducts(res.data.products);

    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));

      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });

      fetchProducts();

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdateSave = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
    

      const { id, price, quantity } = editingProduct;
      console.log("Updating product with ID:", id);  

      await axios.patch(`http://localhost:5000/api/products/update/${id}`,
        { price, quantity },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      setEditingProduct(null);
      fetchProducts();

    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {
        !editingProduct &&
        <div className="mb-6">
          <ProductForm />
        </div>
      }

      {
        editingProduct &&
        <div className="mb-6 border rounded p-4 shadow-lg max-w-md">

          <h2 className="text-lg font-bold mb-3">
            Editing: {editingProduct.name}
          </h2>

          <div className="mb-2">
            <label className="block text-sm">Price</label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct(prev => ({
                  ...prev,
                  price: Number(e.target.value)
                }))
              }
              className="border p-1 rounded w-full"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Quantity</label>
            <input
              type="number"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct(prev => ({
                  ...prev,
                  quantity: Number(e.target.value)
                }))
              }
              className="border p-1 rounded w-full"
            />
          </div>

          <div className="flex gap-2 mt-3">
            <button
              className="bg-green-600 text-white px-4 py-1 rounded"
              onClick={handleUpdateSave}
            >
              Save
            </button>

            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
          </div>

        </div>
      }

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          allProducts.map(p => (
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
                  onClick={() => setEditingProduct({name:p.name,id:p._id,price:p.price,quantity:p.quantity})}
                >
                  Update
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default Products;
