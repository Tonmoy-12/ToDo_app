import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/fetures.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};

// Register a new user
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Send cookie with token
        sendCookie(user, res, "User registered successfully", 201, token);
    } catch (error) {
        next(error);
    }
};

// Login user
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404));

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Send cookie with token
        sendCookie(user, res, `Welcome, ${user.name}`, 200, token);
    } catch (error) {
        next(error);
    }
};

// Get user profile
export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

// Logout user
export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully",
    });
};





















// import { User } from "../model/user.js";
// import bcrypt from "bcrypt";
// import { sendCookie } from "../utils/fetures.js";
// import jwt from "jsonwebtoken";
// import { Task } from "../model/task.js";
// import ErrorHandler from "../middlewares/error.js";

// // Get all users
// export const getAllUsers = async (req, res) => {
   
//     res.json({
//         success: true,
//         User,
//     });
// };

// // Register a new user
// export const register = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if(user)return next(new ErrorHandler("User Allready Exist",404));
        
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         // Generate JWT token and send it in a cookie
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });

//         res.status(201).cookie("token", token, {
//             httpOnly: true,
//             maxAge: 15 * 60 * 1000, // 15 minutes
//         }).json({
//             success: true,
//             message: "User registered successfully",
//         });

//     } catch (error) {
//        next(error);
//     }
// };


// // Login user
// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ email }).select("+password");

//         if(!user)return next(new ErrorHandler("Invalid Email or Password",404));

//         // Check if password is correct
//         const isMatch = await bcrypt.compare(password, user.password);

//         if(!isMatch)return next(new ErrorHandler("Invalid Email or Password",404));

//         sendCookie(user,res,`Welcome To : ${user.name}`,200);
        
//         // Generate JWT token and send it in a cookie
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });

//         res.status(200).cookie("token", token, {
//             httpOnly: true,
//             maxAge: 15 * 60 * 1000, // 15 minutes
//         }).json({
//             success: true,
//             message: "Logged in successfully",
//         });
//     } catch (error) {
//         next(error);
//     }
// };


// // Get user details by ID
// export const getMyProfile = (req, res) => {
  
//     res.status(200).json({
//         success: true,
//         user: req.user,
//     });
// };
// export const logout = (req, res) => {

//     res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
//         success: true,
//         user: req.user,
//     });
// };







