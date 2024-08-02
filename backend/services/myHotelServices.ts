import { HotelType } from "../model/HOTEL_MODEL";

export interface MyHotelServices {
    createHotel(hotelData:HotelType):Promise<HotelType>,
    getAllRoomById(id:string):Promise<HotelType[]>,
    getRoomById(id:string):Promise<HotelType | null>,
    updateRoom(id:string,update:Partial<HotelType>):Promise<HotelType| null>
}