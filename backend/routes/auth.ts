import express from 'express'
import * as controller from '../controller/auth'
import authMiddleware from '../middleware/authMiddleware'

const authRouter = express.Router()


authRouter.post('/login', controller.login)
authRouter.get('/verify-token',[authMiddleware], controller.verifyToken)
authRouter.get('/logout', controller.logout)

export default authRouter