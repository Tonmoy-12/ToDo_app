import mongoose from "mongoose";

// MongoDB connection
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`DB connected with host: ${c.connection.host}`))
    .catch((err) => console.log(err));
};
