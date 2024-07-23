import express from 'express'
const authRouter = express.Router()
import * as controller from '../controller/auth'
authRouter.post('/login', controller.login)

export default authRouter