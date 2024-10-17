
import ErrorHandler from '../middlewares/error.js';
import { Task } from '../model/task.js';

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Check if all required fields are provided
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide both title and description",
      });
    }

    // Create the new task with the authenticated user
    await Task.create({
      title,
      description,
      user: req.user, // Assuming req.user is populated by isAuthenticated middleware
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error); // Pass the error to an error-handling middleware
  }
};
export const getMyTask = async (req, res, next) => {
  const userid = req.user._id;
  try {
    const task = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
try {
  const task = await Task.findById(req.params.id);
  if(!task)return next(new ErrorHandler("Task not found",404));

  task.isCompleted = !task.isCompleted;
  await task.save();
  
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
} catch (error) {
  next(error);
  
}
  
};

export const deleteTask = async (req, res, next) => {
try {
  const task = await Task.findById(req.params.id);
  if(!task)
    return next(new ErrorHandler("Task not found",404));

  await task.deleteOne();
 
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
} catch (error) {
  next(error);
}
  } 





// import { Task } from '../model/task.js';

// export const newTask = async (req, res, next) => {
//   try {
//     const { title, description } = req.body;

//     // Check if all required fields are provided
//     if (!title || !description) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both title and description",
//       });
//     }

//     // Create the new task with the authenticated user
//     await Task.create({
//       title,
//       description,
//       user: req.user._id, // Assuming req.user is populated by isAuthenticated middleware
//     });

//     res.status(201).json({
//       success: true,
//       message: "Task created successfully",
//     });
//   } catch (error) {
//     next(error); // Pass the error to an error-handling middleware
//   }
// };

// export const getMyTask = async (req, res, next) => {
//   const userid = req.user._id;
//   try {
//     const tasks = await Task.find({ user: userid });
//     res.status(200).json({
//       success: true,
//       tasks, // Changed from task to tasks for clarity
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ success: false, message: "Task not found" });

//     task.isCompleted = !task.isCompleted;
//     await task.save();

//     res.status(200).json({
//       success: true,
//       message: "Task updated successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ success: false, message: "Task not found" });

//     await task.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Task deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

























