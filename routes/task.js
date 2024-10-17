import express from 'express';
import { updateTask, getMyTask, newTask, deleteTask} from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// This will now be accessible at /api/v1/task/new
router.post('/new', isAuthenticated, newTask);

// This will now be accessible at /api/v1/task/my
router.get('/my', isAuthenticated, getMyTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;
