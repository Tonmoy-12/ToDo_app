import mongoose from "mongoose";

// MongoDB connection
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};
