import { NextFunction, Request, Response } from "express";
import { BookingType, HotelSearchResponse } from "../types";
import myHotelImplementation from "../services/serviceImplementation/myHotelImplementation";
import Stripe from "stripe";
import env from '../utils/validateEnv'
import Hotel from "../model/HOTEL_MODEL";

const stripe = new Stripe(env.STRIPE_API_KEY)

export const search = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
          req.query.page ? req.query.page.toString() : "1"
        );
        const { data: hotels, total } = await myHotelImplementation.searchHotels(req.query, pageSize, pageNumber)
    
        const response: HotelSearchResponse = {
          data: hotels,
          pagination: {
            total,
            page: pageNumber,
            pages: Math.ceil(total / pageSize),
          },
        };
        res.json(response);
    } catch (error) {
        next(error)
    }
}

export const getHotelById = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const {id} = req.params
    const hotel = await myHotelImplementation.getRoomById(id)

    res.status(200).json(hotel)
  } catch (error:any) {
    next(error)
  }
}

export const payment = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const {numberOfNights} = req.body
    const{hotelId} = req.params
    const hotel = await myHotelImplementation.getRoomById(hotelId)
    const totalCost = hotel?.pricePerNight! * numberOfNights

    const paymentIntent = await stripe.paymentIntents.create({
      amount:totalCost * 100,
      currency:"usd",
      metadata:{
        hotelId,
        userId:req.user?.id.toString()!
      }
    })

    if(!paymentIntent.client_secret){
      return res.status(500).json({message:"Error creating payment intent"})
    }

    const response = {
      paymentIntentId:paymentIntent.id,
      clientSecret:paymentIntent.client_secret.toString(),
      totalCost,
    }

    res.send(response)
  } catch (error) {
    next(error)
  }
}

export const createHotelBookings = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const paymentIntentId = req.body.formData.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (!paymentIntent) {
      return res.status(400).json({ message: "payment intent not found" });
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.user?.id
    ) {
      return res.status(400).json({ message: "payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }
    const newBooking:BookingType = {
      ...req.body.formData, 
      userId:req.user?.id
    }
    const hotel = await Hotel.findOneAndUpdate({_id:req.params.hotelId},{
      $push:{bookings:newBooking}
    })
    if(!hotel){
      return res.status(404).json({message:"Hotel not found"})
    }

    await hotel.save()
    res.status(201).send('ok')
  } catch (error) {
    next(error)
  }
}

export const getMyBookings = async (req:Request,res:Response,next:NextFunction) => {
  try {const userId = req.user?.id
    const bookings = await Hotel.find({'bookings.userId': userId},
      {
        // Only return the matching bookings and the necessary hotel fields
        bookings: { $elemMatch: { userId} },
        name: 1,
        city: 1,
        country: 1,
        description: 1,
        type: 1,
        adultCount: 1,
        childCount: 1,
        facilities: 1,
        pricePerNight: 1,
        starRating: 1,
        imageUrls: 1,
        createdAt: 1,
        updatedAt: 1
      }
    ) 
    res.status(200).json(bookings)
  } catch (error) {
    next(error)
  }
}

export const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };