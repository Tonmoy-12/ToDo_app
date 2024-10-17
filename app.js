import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"; // Import the task router
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
config({
  path: "./data/config.env",
});

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.CLIENT_URL],
  method:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

// Apply user routes with a prefix
app.use("/api/v1/users", userRouter); // All routes in userRouter will be prefixed with /users
app.use("/api/v1/task", taskRouter); // All routes in taskRouter will be prefixed with /task

// Home Route
app.get("/", (req, res) => {
  res.send("Nice, it's working!");
});

// Using Error Handling Middleware
app.use(errorMiddleware);









// import express from "express";
// import userRouter from "./routes/user.js";
// import taskRouter from "./routes/task.js"; // Import the user router
// import { config } from "dotenv";
// import cookieParser from "cookie-parser";

// export const app = express();
// config({
//   path: "./data/config.env",
// });

// // Middleware to parse incoming JSON
// app.use(express.json());
// app.use(cookieParser());

// // Apply user routes with a prefix
// app.use("/api/v1/users", userRouter); // All routes in userRouter will be prefixed with /users
// app.use("/api/v1/task", taskRouter); 

// // Home Route
// app.get("/", (req, res) => {
//   res.send("Nice, it's working!");
// });
// app.use((err,req, res,next) => {
//   return 
//   res.status(404).json({
//     success: false,
//     message: err.message,
//   });
// });