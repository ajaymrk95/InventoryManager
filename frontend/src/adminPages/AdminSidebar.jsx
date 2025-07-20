    import React from 'react'
    import { Link,useNavigate } from 'react-router-dom'
    import { useContext } from 'react'
    import {AuthContext} from '../Context/AuthProvider'
    import axios from "axios"


    const items = [
        {name:"Categories",path:"/admin-dashboard/categories"},
        {name:"Products",path:"/admin-dashboard/products"},
        {name:"Orders",path:"/admin-dashboard/orders"}
    ]

    const AdminSidebar = () => {


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
                localStorage.removeItem("auth");
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
        <aside className='flex flex-col items-center min-h-screen justify-center w-20 md:w-64 bg-blue-900 shadow-lg '>

        <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold font mt-4 text-white hidden md:block">Admin Panel</h2>

        </div>

            <div className="flex-1  justify-center items-center flex-col">
            
            {items.map((item)=>
            (
                <Link key={item.name} to={item.path} className='flex items-center md:gap-3 justify-center md:justify-start px-3 py-2 rounded-md transition-colors duration-200 '>
                    <span className="sm:text-small font-bold  md:inline text-base text-white">{item.name}</span>
                </Link>
            ))}
            
                <button onClick={()=>{handleLogout()}} className="mt-4 w-full px-3 py-2 text-sm font-semibold font-serif text-blue-900 bg-white rounded-md hover:bg-gray-100 transition-colors">Logout</button>
            </div>

          
        </aside>
        </>
    )
    }

    export default AdminSidebar