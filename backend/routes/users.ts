import express from 'express'
import * as controller from '../controller/users'
import authMiddleware from '../middleware/authMiddleware';
const userRouter = express.Router();

userRouter.post('/register',controller.register)
userRouter.get('/me', authMiddleware, controller.userAuthenticated)

export default  userRouter