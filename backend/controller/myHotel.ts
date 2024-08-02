import { NextFunction, Request, Response } from "express";
import cloudinary from 'cloudinary'
import { HotelType } from "../model/HOTEL_MODEL";
import MyHotelImplementation from "../services/serviceImplementation/myHotelImplementation";
import { createHotelValidation } from "../types";
import { ZodError } from "zod";


export const  createMyHotels = async(req:Request, res:Response, next:NextFunction) => {
    try {
        req.body.adultCount = Number(req.body.adultCount);
        req.body.childCount = Number(req.body.childCount);
        req.body.pricePerNight = Number(req.body.pricePerNight);
        req.body.starRating = Number(req.body.starRating);
        
        createHotelValidation.parse(req.body)
        const imageFiles = req.files as Express.Multer.File[] 
        const newHotel:HotelType = req.body
        const uploadPromise = imageFiles.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString("base64")
            let dataUri="data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataUri)
            return res.url;
        })
        const imageUrls = await Promise.all(uploadPromise)
        newHotel.imageUrls = imageUrls
        newHotel.userId = req.user?.id!
     

        const hotel = await MyHotelImplementation.createHotel(newHotel)

        res.status(201).json({message:'Hotel Created!', hotel})

    } catch (error:any) {
        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map(err => {
                let message = err.message;
                if (err.message === 'Required') {
                    message = err.path.join('.') + ' is required';
                }
                return {
                    path: err.path.join('.'),
                    message
                };
            });
            return res.status(400).json({ errors: formattedErrors });
        }
        console.log(error)
        next(error)
    }
}


export const getAllRoomById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const room = await MyHotelImplementation.getAllRoomById(req.user?.id!)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

export const getRoomById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const{id} = req.params
        const room = await MyHotelImplementation.getRoomById(id)
        if(!room){
            res.status(404)._construct
            throw new Error('No room found!')
        }else{
            res.status(200).json(room)
        }
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async(req:Request,res:Response,next:NextFunction) => {
    try {
       const updateRoom = req.body 
       const imageFiles = req.files as Express.Multer.File[] 
       const {id} = req.params
       const uploadPromise = imageFiles.map(async(image) => {
           const b64 = Buffer.from(image.buffer).toString("base64")
           let dataUri="data:" + image.mimetype + ";base64," + b64;
           const res = await cloudinary.v2.uploader.upload(dataUri)
           return res.url;
       })
       const imageUrls = await Promise.all(uploadPromise)
       updateRoom.imageUrls = imageUrls
       updateRoom.userId = req.user?.id!
       const room = await MyHotelImplementation.updateRoom(id, updateRoom)
       res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}