
import jwt from "jsonwebtoken";
export const sendCookie = (user,res,message,statusCode=200)=>{

 // Generate JWT token
 const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
});

// Send the token as a cookie
res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
}).json({
    success: true,
    message,
});
}
