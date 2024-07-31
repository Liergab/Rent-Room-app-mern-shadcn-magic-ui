import express     from 'express'
import userRouter  from './users'
import authRouter  from './auth'
import hotelRouter from './myHotel'

const rootRouter = express.Router()

rootRouter.use('/v1/users/', userRouter)
rootRouter.use('/v1/auth/', authRouter)
rootRouter.use('/v1/', hotelRouter)

export default rootRouter
