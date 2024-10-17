import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Task model based on the schema
export const Task = mongoose.model("Task", taskSchema);
