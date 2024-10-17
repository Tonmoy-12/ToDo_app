
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Check if the user is authenticated
    const { token } = req.cookies;
    if (!token) {
      console.log("No token found in cookies");
      return res.status(404).json({
        success: false,
        message: "Login required",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded); // Log the decoded token for debugging

    // Find the user by the decoded _id
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found for ID:", decoded.id); // Log when the user is not found
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Set the user in the request object
    req.user = user;
    // console.log("Authenticated user:", user); // Log the authenticated user
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Error in authentication middleware:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};



// import { User } from "../model/user.js";
// import jwt from "jsonwebtoken";

// export const isAuthenticated = async (req, res, next) => {
//     // Check if the user is authenticated
//     const {token} = req.cookies;
//     if(!token)
//         return res.status(404).json({
//             success:false,
//             message:"Login required",
//         });
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         req.user = await User.findById(decoded._id);
//         next();
// }