import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();

const verifyJWT = async(req,res,next)=>
{
    const authHeader = req.headers.authorization || req.headers.Authorization  
    
    if(!authHeader)
       return res.status(401).json({success:false,message:"Missing Access Token"})

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>
        {
            if(err)
                return res.status(403).json({success:false})
        

        req.user = decoded.username;
        req.role = decoded.role;    

        next();
    } );
}
    
export default verifyJWT