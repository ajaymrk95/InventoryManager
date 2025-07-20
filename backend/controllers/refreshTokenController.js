import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => 
    {
    
    if (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
      return res.status(403).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      {
        username: foundUser.username,
        role: foundUser.role  
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ success: true, accessToken: newAccessToken,role:foundUser.role});
  });
};

export default handleRefreshToken;
