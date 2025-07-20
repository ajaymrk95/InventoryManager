import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect,useContext} from 'react'
import './App.css'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import ADDashboard from './adminPages/ADDashboard.jsx'
import UserDash from "./userPages/userDash.jsx"
import Unauthorized from './Pages/Unauthorized.jsx'
import RedirectAuth from './RedirectAuth.jsx'
import ProtectedRoutes from './ProtectRoutes.jsx'
import Categories from './adminPages/Categories.jsx'
import Products from './adminPages/Products.jsx'  

import UserProducts from './userPages/UserProducts.jsx'
import UserOrders from './userPages/UserOrders.jsx'
import Orders from './adminPages/Orders.jsx'



function App() {

  return (
   <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/unauthorized" element={<Unauthorized/>} />

          <Route path="/login" element={<RedirectAuth><Login/></RedirectAuth>}></Route>
          
          <Route path="/register" element={<RedirectAuth><Register/></RedirectAuth>}></Route>

          <Route path='/admin-dashboard' element={<ProtectedRoutes allowedRoles={["admin"]}> <ADDashboard/> </ProtectedRoutes>}>

                     <Route index element={<h1 className="text-xl font-semibold">Welcome to Admin Dashboard</h1>} />
          
                    <Route path='categories' element={<Categories />}></Route>

                    <Route path='products' element={<Products/>}></Route>
                  
                    <Route path='orders' element={<Orders/>}></Route>
          
          </Route>

          <Route path='/user-dashboard' element={<ProtectedRoutes allowedRoles={["user"]}><UserDash/> </ProtectedRoutes>}>
                    
                    <Route index element={<h1 className="text-xl font-semibold">Welcome to User Dashboard</h1>} />
                    <Route path='products' element={<UserProducts/>}></Route> 
                    <Route path='orders' element={<UserOrders />}></Route> 
          </Route>
      </Routes>
   </Router>
  )
}

export default App
