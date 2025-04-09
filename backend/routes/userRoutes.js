import express from 'express';
import { loginUser, registerUser, getUserDetails, loginWithGoogle, updateUser, updatePassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/google-login', loginWithGoogle);
userRouter.get('/me', authMiddleware, getUserDetails);
userRouter.put('/me', authMiddleware, updateUser); 
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;