import express     from 'express'
import userRouter  from './users'
import authRouter  from './auth'
import hotelRouter from './myHotel'
import searchRouter from './hotels'

const rootRouter = express.Router()

rootRouter.use('/v1/users/', userRouter)
rootRouter.use('/v1/auth/', authRouter)
rootRouter.use('/v1/', hotelRouter)
rootRouter.use('/v1', searchRouter)

export default rootRouter
