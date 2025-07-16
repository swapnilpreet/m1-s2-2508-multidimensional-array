import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers); // Admin can get all users

router.route('/profile')
  .get(protect, getUserProfile) // Users can get their own profile
  .put(protect, updateUserProfile); // Users can update their own profile

router.route('/:id')
  .delete(protect, admin, deleteUser) // Admin can delete users
  .get(protect, admin, getUserById) // Admin can get user by ID
  .put(protect, admin, updateUser); // Admin can update user by ID

export default router;