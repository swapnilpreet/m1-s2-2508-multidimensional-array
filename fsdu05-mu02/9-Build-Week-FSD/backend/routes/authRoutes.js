import express from 'express';
import { authUser, changepassword, registerUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/password',protect,changepassword)
export default router;