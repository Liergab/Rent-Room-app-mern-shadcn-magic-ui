import express from "express";
import * as controller from '../controller/myHotel'
import multer from 'multer'
import authMiddleware from "../middleware/authMiddleware";
const hotelRouter = express.Router()

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits:{
        fileSize : 5 * 1024 * 1024 //5MB
    }
})

hotelRouter.post("/my-hotels",authMiddleware,upload.array('imageFiles',6) ,controller.createMyHotels)

export default hotelRouter