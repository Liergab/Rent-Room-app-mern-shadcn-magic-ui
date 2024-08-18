export interface RoomType  {

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
    bookings      : BookingType;

}

export interface HotelType {

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
    bookings      : BookingType;
    createdAt     : Date;
    updatedAt     : Date;

}

export type HotelSearchResponse = {
    data:HotelType[],
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}

export interface UserType {
    id        : string,
    email     : string,
    password  : string,
    firstName : string,
    lastName  : string
    createdAt  : Date;
    updatedAt  : Date;
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

