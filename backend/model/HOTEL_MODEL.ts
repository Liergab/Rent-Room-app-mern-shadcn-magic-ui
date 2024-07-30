import mongoose,{ Document, model, Schema} from "mongoose";

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

}

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

    }
},{timestamps:true})

const Hotel = model<HotelType>("Hotel", hotelSchema)

export default Hotel