import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Context/AuthProvider'
const items = [
    {name:"Products",path:"/user-dashboard/products"},
    {name:"Orders",path:"/user-dashboard/orders"},

]

const UserSidebar = () => {


  const {auth,setAuth} = useContext(AuthContext)
 
   const navigate = useNavigate()
   
   const handleLogout = async()=>
   {   
      try
      {
 
      
       const response = await axios.get("http://localhost:5000/logout",{withCredentials:true});
 
       if(response.data.success==true)
       {
           setAuth({});
           navigate("/login");
           console.log(auth)
           return;
       }
 
       else
       {
          console.log("Error Logging Out")
          return;
       }
      }
 
      catch(error)
      {
         console.error("Logout error:", error);
      }
       
   }
 
  return (
    <>
    <aside className="flex flex-col justify-between min-h-screen w-20 md:w-64 bg-blue-900 text-white p-4 shadow-xl">

        <div className="mb-8">
            <h2 className="text-2xl font-bold hidden md:block">User Panel</h2>
            <h2 className="text-xl font-bold md:hidden">Panel</h2>
        </div>

        
        <nav className="flex flex-col gap-4 flex-1">
            {items.map((item) => (
            <Link
                key={item.name}
                to={item.path}
                className="flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                <span className="sm:text-small md:inline text-base">{item.name}</span>
            </Link>

            
            ))}
        </nav>

         <button
            onClick={handleLogout}
            className="mt-4 w-full px-3 py-2 text-sm font-semibold text-blue-900 bg-white rounded-md hover:bg-gray-100 transition-colors"
        >
            Logout
        </button>
</aside>

    </>
  )
}

export default UserSidebar