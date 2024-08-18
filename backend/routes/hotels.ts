import express from 'express'
import * as controller from '../controller/hotels'
import authMiddleware from '../middleware/authMiddleware'

const searchRouter = express.Router()

searchRouter.post("/:hotelId/bookings", authMiddleware, controller.createHotelBookings)
searchRouter.post('/:hotelId/bookings/payment-intent', authMiddleware, controller.payment)
searchRouter.get('/my-bookings/', authMiddleware, controller.getMyBookings)
searchRouter.get('/search', controller.search)
searchRouter.get('/find/:id', controller.getHotelById)
searchRouter.get('/hotel', controller.getAllHotel)

export default searchRouter