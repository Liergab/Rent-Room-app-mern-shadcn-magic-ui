import { HotelType } from "../../model/HOTEL_MODEL";
import MyHotelRepository from "../../repository/myHotelRepository";
import { MyHotelServices } from "../myHotelServices";


class MyHotelImplementation implements MyHotelServices{
    async createHotel(hotelData: HotelType): Promise<HotelType> {
        return MyHotelRepository.createHotel(hotelData)
    }
}

export default new MyHotelImplementation()