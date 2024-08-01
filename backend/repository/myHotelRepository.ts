import Hotel , { HotelType } from "../model/HOTEL_MODEL";

class MyHotelRepository{
    async createHotel (hotelData:HotelType):Promise<HotelType> {
        return await Hotel.create(hotelData)
    }

    async getAllRoomById(id:string):Promise<HotelType[]>{
        return await Hotel.find({userId:id}).exec()
    }
}

export default new MyHotelRepository()