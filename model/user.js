import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
  },
  
  email:{
    type: String,
    required:true,
    unique: true,
  },
  password:{
    required:true,
    type: String,
    select: false,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
 
});

// Export the User model based on the schema
export const User = mongoose.model("User", userSchema);
