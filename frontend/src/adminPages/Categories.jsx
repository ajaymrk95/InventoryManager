    import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'

const Categories = () => {
  
  const [catName,setCatName] = useState("")
  const [catDesc,setCatDesc] = useState("")
  const [allCategories,setAllCategories] = useState([]);


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
        setAllCategories(response.data.categories); 
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDelete = async (id)=>
  { 

     try {
        
        const auth = JSON.parse(localStorage.getItem("auth"));
        const acctoken = auth?.token;
        const response = await axios.delete(`http://localhost:5000/api/category/delete/${id}`,
            {
                headers: {
                        Authorization: `Bearer ${acctoken}`,
             }, 
            });
        
        
            if(response.data.success)
            {
                 fetchCategories();
            }
        
     } 
     
     catch (error) {
            
        alert("Could Not Delete Category");
        console.error("Error Deleting Category", error);
     }
     
  }


 
useEffect(() => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.token) {
    fetchCategories();
  }
}, []);
  const handleSubmit = async (e)=>
  {
      e.preventDefault();

     
      const auth = JSON.parse(localStorage.getItem("auth"));
      const acctoken = auth?.token;
      const response = await axios.post("http://localhost:5000/api/category/add",{name:catName,description:catDesc},
        {
            headers:
            {
                Authorization:`Bearer ${acctoken}`
            }
        }
      );
      
      if (response.data.success)
      {  
         alert("Category Added Successfully")
         console.log('Category Added Successfully',response.data);
         setCatName("")
         setCatDesc("")

       
      }

      else
      {
         alert("Error Adding Category");
         console.error("Error Adding Category")
         
      }
      
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Category Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Add Category</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              id="catName"
              placeholder="Category Name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              onChange={(e)=>setCatName(e.target.value)}
            />  
            <input
              type="text"
              id='catDesc'
              placeholder="Category Description"
              onChange={(e)=>setCatDesc(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />

            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition duration-400"
            >
              Add Category
            </button>
          </form>
        </div>

        
        <div className="bg-gray-50 p-6 rounded-2xl shadow-inner text-center text-gray-500">
         
         {allCategories.length === 0 ? (<p> No Categories Found.</p>) : (
            <ul>
             {allCategories.map((c)=>
             (
                <li key={c._id} className="border p-3 rounded-md shadow-sm bg-white">
                     <strong>{c.name}</strong><br />
                     <span className="text-sm text-gray-600">{c.description}</span>
                     <div className="flex flex-row">
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                          onClick={()=>{handleDelete(c._id)}}>Delete</button>
                     </div>
                </li>
             ))}
            </ul>)}
        
        </div>
      </div>
    </div>
  )
}

export default Categories
