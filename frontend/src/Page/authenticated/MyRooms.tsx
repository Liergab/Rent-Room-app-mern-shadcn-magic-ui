import { Button }               from '@/components/ui/button'
import { useGetAllRoomByOwner } from '@/services/api/Room'
import { Link }                 from 'react-router-dom'
import { LuMapPin }             from "react-icons/lu";
import { IoPricetagsOutline }   from "react-icons/io5";
import { BsBuilding }           from "react-icons/bs";
import { LuUsers }              from "react-icons/lu";
import { FaRegStar }            from "react-icons/fa6";
import useMetaTags from '@/hooks/useMetaTags';


const MyRooms = () => {
    useMetaTags('Hotel List', 'Hotel List')
    const {data:hotelData,isLoading} = useGetAllRoomByOwner()
   
    if(isLoading){
        return 
    }
  return (
    <div className='space-y-5 container'>
        <span className='flex justify-between'>
            <h1 className='text-3xl font-bold'>MyRooms</h1>
            <Link to="/add-hotel">
                <Button type='button' className=''>Add Room</Button>
            </Link>
        </span>
        {hotelData?.length === 0 && <h1>No Room Found</h1>}
        <div className='flex flex-col gap-4'>
            {hotelData?.map((hotel) => (
                <div className='flex flex-col gap-4 border border-bleached-cedar-800 p-8 rounded' key={hotel._id}>
                    <h1 className='mb-3 text-lg font-bold'>{hotel?.name}</h1>
                    <p className='mb-4 whitespace-pre-line'>{hotel.description}</p>
                    <div className='md:grid grid-cols-6 gap-2 mb-3 hidden '>
                        {hotel.imageUrls.map((imageUrl, index) => (
                            <img key={index} src={imageUrl}  alt={`Hotel ${hotel.name} - ${index + 1}`} className='col-span-1  z-50 rounded h-20 w-60' />
                        ))}
                    </div>
                    <div className='inline md:hidden'>
                       
                            <img src={hotel.imageUrls[0]}  alt={hotel.name} className='col-span-1  z-50 rounded h-40 w-60' />
                       
                    </div>

                    <div className='grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 mb-3'>
                        <div className='list-hotel-data'>
                            <LuMapPin /> {hotel.city},{hotel?.country}
                        </div>
                        <div className='list-hotel-data'>
                            <BsBuilding />{hotel.type}
                        </div>
                        <div className='list-hotel-data'>
                             <IoPricetagsOutline /> {hotel.pricePerNight} Per night
                        </div>
                        <div className='list-hotel-data'>
                        <LuUsers /> {hotel.adultCount} Adult, {" "} 
                            {hotel.childCount} Child
                        </div>
                        <div className='list-hotel-data'>
                        <FaRegStar />{hotel.starRating} {" "} StarRating
                        </div>
                    </div>
                    <div className='flex flex-row-reverse'>
                        <Link to={`/edit-hotel/${hotel?._id}`}>
                            <Button>View Details</Button>
                        </Link>
                        
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyRooms
