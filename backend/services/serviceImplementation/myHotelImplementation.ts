import { constructSearchQuery } from "../../controller/hotels";
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

    async searchHotels(queryParams: any, pageSize:number, pageNumber:number) {
        const query = constructSearchQuery(queryParams);

        let sortOption = {};
        switch (queryParams.sortOption) {
            case "starRating":
                sortOption = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOption = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOption = { pricePerNight: -1 };
                break;
        }

        // const pageSize = 5;
        // const pageNumber = parseInt(queryParams.page ? queryParams.page.toString() : "1");

        return await MyHotelRepository.searchHotel(query, sortOption, pageSize, pageNumber);
    }
}

export default new MyHotelImplementation()