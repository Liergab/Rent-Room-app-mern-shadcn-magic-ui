import Hotel , { HotelType } from "../model/HOTEL_MODEL";

class MyHotelRepository{
    async createHotel (hotelData:HotelType):Promise<HotelType> {
        return await Hotel.create(hotelData)
    }

    async getAllRoomById(id:string):Promise<HotelType[]>{
        return await Hotel.find({userId:id}).exec()
    }

    async getRoomById(id:string):Promise<HotelType | null>{
        return await Hotel.findById(id).exec()
    }

    async updateRoom (id:string, update:Partial<HotelType>):Promise<HotelType | null>{
        return await Hotel.findByIdAndUpdate(id,update,{new:true}).exec()
    }
}

export default new MyHotelRepository()