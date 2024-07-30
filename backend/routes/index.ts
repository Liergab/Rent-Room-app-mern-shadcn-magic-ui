import express     from 'express'
import userRouter  from './users'
import authRouter  from './auth'
import hotelRouter from './myHotel'

const rootRouter = express.Router()

rootRouter.use('/api/v1/users/', userRouter)
rootRouter.use('/api/v1/auth/', authRouter)
rootRouter.use('/api/v1/', hotelRouter)

export default rootRouter
