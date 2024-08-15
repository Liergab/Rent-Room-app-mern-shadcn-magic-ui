import {z} from 'zod'
import { HotelType } from '../model/HOTEL_MODEL';

export const createHotelValidation = z.object({
    name: z.string().min(1, 'Name required'),
    city: z.string().min(1, 'City required'),
    country: z.string().min(1, 'Country required'),
    description: z.string().min(1, 'Description required'),
    type: z.string().min(1, 'Type required'),
    adultCount: z.number().min(1, "At least one adult is required"),
    childCount: z.number().nonnegative("Child count cannot be negative"),
    facilities: z.array(z.string()).min(1, "At least one facility is required"),
    starRating: z.number().min(1, "Star rating must be at least 1").max(5, "Star rating must be at most 5"),
    pricePerNight: z.number().positive("Price per night must be positive"),
});


export type HotelSearchResponse = {
    data:HotelType[],
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}

export type paymentIntentResponse = {
    paymentIntentId:string,
    clientSecret:string,
    totalCost : number,
}

export type BookingType = {
    _id       : string,
    userId    : string,
    email     : string,
    firstName : string,
    lastName  : string,
    adultCount: number;
    childCount: number;
    checkIn   : Date;
    checkOut  : Date;
    totalCost : number
}