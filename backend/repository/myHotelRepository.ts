import Hotel , { HotelType } from "../model/HOTEL_MODEL";

class MyHotelRepository{
    async createHotel (hotelData:HotelType):Promise<HotelType> {
        return await Hotel.create(hotelData)
    }
}

export default new MyHotelRepository()