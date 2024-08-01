
import Hotel, { HotelType } from "../../model/HOTEL_MODEL";
import MyHotelRepository from "../../repository/myHotelRepository";
import mongoose from "mongoose";

jest.mock('../../model/HOTEL_MODEL', () => ({
    find: jest.fn().mockReturnThis(),
    exec:jest.fn()
}))


describe('Room Repository', () => {
    type testRoom = Pick<HotelType, 'id'|'userId'|'name'|
                                    'city'|'country'|'description'|
                                    'type'|'adultCount'|'childCount'|
                                    'facilities'|'pricePerNight'|'starRating'|
                                    'imageUrls'|'createdAt'|'updatedAt'>

    let myHotelRepository: typeof MyHotelRepository

    beforeEach(() => {
        myHotelRepository = MyHotelRepository
    })

    afterEach(() =>{
        jest.clearAllMocks()
    })

    describe('getAllRooById', () => {
        it('should get all room by id', async() => {

            const userId = new mongoose.Types.ObjectId().toHexString()
            const rooms:testRoom[] = [
                {
                    id:new mongoose.Types.ObjectId().toHexString(),
                    userId,
                    name:'Berja Resort',
                    city:'Lucena',
                    country:'Philippines',
                    description:'Test description',
                    type:"Family",
                    adultCount:10,
                    childCount:10,
                    facilities:['wifi','restaurant'],
                    pricePerNight:3000,
                    starRating:5,
                    imageUrls:['1.jpg, 2.jpg'],
                    createdAt:new Date(),
                    updatedAt:new Date(),
                }
            ];

            (Hotel.find().exec as jest.Mock).mockResolvedValue(rooms);

            const result = await myHotelRepository.getAllRoomById(userId)
            expect(Hotel.find).toHaveBeenLastCalledWith({userId})
            expect(result).toEqual(rooms);



        })
    })
})