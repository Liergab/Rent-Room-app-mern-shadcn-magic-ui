import express from 'express'
import userRouter from './users'
import authRouter from './auth'
const rootRouter = express.Router()

rootRouter.use('/api/v1/users/', userRouter)
rootRouter.use('/api/v1/auth/', authRouter)

export default rootRouter
