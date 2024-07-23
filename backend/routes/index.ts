import express from 'express'
import userRouter from './users'

const rootRouter = express.Router()

rootRouter.use('/api/v1', userRouter)


export default rootRouter
