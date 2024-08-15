import mongoose,{ Document, model, Schema} from "mongoose";
import { BookingType } from "../types";

export interface HotelType extends Document{

    _id           : string;
    userId        : string;
    name          : string;
    city          : string;
    country       : string;
    description   : string;
    type          : string;
    adultCount    : number;
    childCount    : number;
    facilities    : string[];
    pricePerNight : number;
    starRating    : number;
    imageUrls     : string[];
    createdAt     : Date;
    updatedAt     : Date;
    bookings      : BookingType[]

}

const bookingSchema = new Schema<BookingType>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    adultCount:{
        type:Number,
        required:true
    },
    childCount:{
        type:Number,
        required:true
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    totalCost:{
        type:Number,
        required:true
    },

    
})

const hotelSchema = new Schema<HotelType>({
    userId:{

        type      : String,
        required  : true 

    },
    name:{

        type      : String,
        required  : true 

    },
    city:{

        type      : String,
        required  : true 

    },
    country:{

        type      : String,
        required  : true 

    },
    description:{

        type      : String,
        required  : true 

    },
    type:{
        type      : String,
        required  : true 
    },
    adultCount:{
        type      : Number,
        required  : true 
    },
    childCount:{

        type      : Number,
        required  : true 

    },
    facilities:{

        type      : [{type:String, required:true }],
        
    },
    pricePerNight:{

        type      : Number,
        required  : true 

    },
    starRating:{

        type      : Number,
        required  : true,
        min       : 1,
        max       : 5

    },
    imageUrls:{

        type      : [{type:String,  required:true }],

    },
    bookings:[bookingSchema]
},{timestamps:true})

const Hotel = model<HotelType>("Hotel", hotelSchema)

export default Hotel