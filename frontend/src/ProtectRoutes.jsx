    import React from 'react'
    import { useState,useEffect,useContext } from 'react'
    import {AuthContext} from './Context/AuthProvider'
    import { Navigate,useLocation } from 'react-router-dom';


    const ProtectedRoutes = ({allowedRoles,children}) => {

        
        const {auth } = useContext(AuthContext);
        const location = useLocation();
        
        if (!auth?.token) 
        {
        return <Navigate to="/login" state={{ from: location }} replace />;
        }
        
        if(!allowedRoles.includes(auth.role))
            return <Navigate to="/unauthorized" replace />;

        return children
    }

    export default ProtectedRoutes