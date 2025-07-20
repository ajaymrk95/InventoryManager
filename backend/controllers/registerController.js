import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import User from "../models/User.js"

const registerController = async( req,res)=>
{
     const {username,password} = req.body

     if(!username || !password)
     {
           
         return res.status(400).json({success:false,message:"Login Credentials Missing!"})
     }

     const checkUserExist = await User.findOne({username:username})

     if(checkUserExist)
        
        return res.status(409).json({success:false,message : "User Exists! Proceed to Login"})


     try {

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser  = new User({
            username:username,
            password:hashedPassword,
            role:'user',
            refreshToken:null
        })

        await newUser.save()    

         res.status(201).json({success:true,message:"New User Added"})
        
     } 
     
     catch (error) 
     {

        res.status(500).json({success:false,message:"Internal Server Error!"})

     }
        
     
}

export default registerController