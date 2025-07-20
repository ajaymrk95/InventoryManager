import React from 'react'
import { useState,useContext,useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider'
import axios from "axios"
import AdminSidebar from './AdminSidebar';

const ADDashboard = () => {


  return (

    <>
     <div className='min-h-screen flex'>

      <AdminSidebar />
      

      <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
      
       <Outlet />
      </main>
     </div>
       

    </>
  )
}

export default ADDashboard