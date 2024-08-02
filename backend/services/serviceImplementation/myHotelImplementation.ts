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

    async getRoomById(id: string): Promise<HotelType | null> {
        const room = await MyHotelRepository.getRoomById(id)
        return room;
    }

    async updateRoom(id: string, update: Partial<HotelType>): Promise<HotelType | null> {
        return  MyHotelRepository.updateRoom(id, update)
    }
}

export default new MyHotelImplementation()