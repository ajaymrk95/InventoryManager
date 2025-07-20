import mongoose from "mongoose";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import User from "./models/User.js"
import dbConnect from "./dbConnect.js";

dotenv.config();

const addAdminuser = async ()=>
{  
    try {
        
        dbConnect();
    
    const hashedPass = await bcrypt.hash(process.env.adminpass,10);
    const newAdmin = new User
        ({
            username:"adminuser",
            password:hashedPass,
            role:"admin",
            refreshToken:null
        })

    await newAdmin.save();

    console.log("New Admin User Added!")


    } 
    
    catch (error) 
    {
        console.log("Unable to add Admin, Server Error",error.message);
    }
    
}

addAdminuser();