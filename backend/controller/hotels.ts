import { NextFunction, Request, response, Response } from "express";
import Hotel from "../model/HOTEL_MODEL";
import { HotelSearchResponse } from "../types";


export const search = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        )

        const skip = (pageNumber - 1) * pageSize

        const hotels = await Hotel.find().skip(skip).limit(pageSize)
        const total = await Hotel.countDocuments()
        const Response:HotelSearchResponse= {
            data:hotels,
            pagination:{
                total,
                page:pageNumber,
                pages:Math.ceil(total/pageSize)
            }
        }
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}