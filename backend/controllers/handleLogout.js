import User from "../models/User.js";


const handleLogout= async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(200).json({ success: true, message: "Logout Complete" });
  }

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken:refreshToken})

  res.clearCookie ("jwt",{httpOnly:true,sameSite: "None",maxAge:24*60*60*1000})

  if(!foundUser)
  { 
      return res.status(200).json({ success: true, message: "Logout Complete" });

  }

   foundUser.refreshToken=null;
   await foundUser.save();
 
   return res.status(200).json({ success: true, message: "Logout complete" });

};

export default handleLogout;
