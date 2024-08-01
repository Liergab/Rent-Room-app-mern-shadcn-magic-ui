import { HotelType } from "../../model/HOTEL_MODEL";
import MyHotelRepository from "../../repository/myHotelRepository";
import { MyHotelServices } from "../myHotelServices";


class MyHotelImplementation implements MyHotelServices{
    async createHotel(hotelData: HotelType): Promise<HotelType> {
        return MyHotelRepository.createHotel(hotelData)
    }

    async getAllRoomById(id: string): Promise<HotelType[]> {
        const room = await MyHotelRepository.getAllRoomById(id)
        return room;
    }
}

export default new MyHotelImplementation()