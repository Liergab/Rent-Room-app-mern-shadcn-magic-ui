import { HotelType } from "../model/HOTEL_MODEL";

export interface MyHotelServices {
    createHotel(hotelData:HotelType):Promise<HotelType>
}