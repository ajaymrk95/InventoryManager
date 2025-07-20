import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {AuthContext} from './Context/AuthProvider'
import { Navigate,useLocation } from 'react-router-dom';


const RedirectAuth = ({children}) => {

    
    const { auth } = useContext(AuthContext);
    const location = useLocation();

     if (auth.token) 
    {
         if(auth.role =="admin")
            { 
                return <Navigate to="/admin-dashboard" replace/>
            }    
        else   
            return <Navigate to="/user-dashboard" replace/>
    }

    return children
}

export default RedirectAuth