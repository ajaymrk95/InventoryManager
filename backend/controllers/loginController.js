import express from "express"
import cors from "cors"
import bcrypt, { hash } from "bcrypt"
import User from "../models/User.js"
import dotenv from "dotenv"

dotenv.config();
import jwt from "jsonwebtoken"

const loginController = async(req,res)=>
{
     const {username,password} = req.body

     if(!username || !password)
     {
           
         return res.status(400).json({success:false,message:"Login Credentials Missing!"})
     }

     const checkUserExist = await User.findOne({username:username})

     if(!checkUserExist)
        
        return res.status(401).json({success:false,message : "Invalid Credentials!"})

     try {
        
        const hashedPassword = checkUserExist.password;

        const passcheck = await bcrypt.compare(password,hashedPassword);

        if(!passcheck)
             return res.status(401).json({success:false,message : "Invalid Username or Password"})

         const accessToken = jwt.sign(
            {username:checkUserExist.username,
             role:checkUserExist.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1h"}

         )

           const refreshToken = jwt.sign(
            {username:checkUserExist.username,
             role:checkUserExist.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}

         )

         
         checkUserExist.refreshToken = refreshToken;
         await checkUserExist.save();

     
         res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
         });


        res.status(200).json({success:true,accessToken,role:checkUserExist.role})
        
     } 

     catch (error) 
     {

        res.status(500).json({success:false,message:"Internal Server Error!"})

     }
        
     
}

export default loginController