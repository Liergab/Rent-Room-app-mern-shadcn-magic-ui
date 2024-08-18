import Hotel , { HotelType } from "../model/HOTEL_MODEL";

class MyHotelRepository{
    async createHotel (hotelData:HotelType):Promise<HotelType> {
        return await Hotel.create(hotelData)
    }

    async searchHotel (query:any, sortOption:any, pageSize:any, pageNumber:any):Promise<{data:HotelType[], total:number}>{
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(pageSize)
            .exec();

        const total = await Hotel.countDocuments(query);

        return { data: hotels, total };
    }

    async getAllRoomById(id:string):Promise<HotelType[]>{
        return await Hotel.find({userId:id}).exec()
    }
    async getAllHotel():Promise<HotelType[]>{
        return await Hotel.find().sort({createdAt:-1})
    }

    async getRoomById(id:string):Promise<HotelType | null>{
        return await Hotel.findById(id).exec()
    }

    async updateRoom (id:string, update:Partial<HotelType>):Promise<HotelType | null>{
        return await Hotel.findByIdAndUpdate(id,update,{new:true}).exec()
    }
}

export default new MyHotelRepository()