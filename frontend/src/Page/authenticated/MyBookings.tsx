import useMetaTags from '@/hooks/useMetaTags'
import { useGetMyBookings } from '@/services/api/Room'
import { HotelType } from '@/types'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const MyBookings = () => {
   useMetaTags('My-Bookings', 'Where my Bookings Store')
    const {data:MyBookings, isLoading} = useGetMyBookings()
   
    if(isLoading) return
   
  return (
    <div className='container h-full'>
        <div className='flex  flex-col gap-2 '>
            {MyBookings?.map((mb:HotelType) => (
                <div key={mb._id} className='border border-bleached-cedar-500 rounded p-8' >
                    <div className='mb-3 flex flex-col  border-b border-black dark:border-bleached-cedar-500'>
                        <Link to={`/detail/${mb._id}`} className=' font-bold text-xl '>{mb.name}</Link>
                        <div className='flex py-4'>
                            {Array.from({ length: mb.starRating }).map((_, index) => (
                                <div key={index}>
                                    <AiFillStar className='fill-yellow-400' />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='grid grid-cols sm:grid-cols-[2fr_1fr] gap-10 p-2 md:p-8'>
                        <div className='flex flex-col'>
                            <div className='lg:grid lg:grid-cols-3 xl:grid-cols-3 gap-4 hidden h-[200px] w-full'>
                                {mb.imageUrls.map((url, index) => (
                                    <img src={url} alt="images" className='hidden lg:inline w-full h-full object-cover object-center bg-no-repeat rounded-md' key={index}/>
                                ))}
                            </div>
                            <div>
                                <div className='inline lg:hidden h-[300px] w-full'>
                                    <img src={mb.imageUrls[0]} alt="image" className='h-[200px] w-full bg-cover bg-no-repeat bg-center rounded-md'/>
                                </div>
                                <div className='mb-4 font-bold mt-4 whitespace-pre-line text-gray-600 bg-bleached-cedar-50 dark:bg-bleached-cedar-950 dark:text-bleached-cedar-50 p-4 rounded-md'>
                                    Description: {" "}
                                    <span className='font-normal'>{mb.description}</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    {mb.facilities.slice(0, 3).map((facilities, index) => (
                                        <span className='bg-bleached-cedar-50 dark:bg-bleached-cedar-950 dark:text-bleached-cedar-50  border border-bleached-cedar-400 p-2 rounded-lg text-xs whitespace-nowrap ' key={index}>
                                            {facilities}
                                        </span>
                                    ))}
                                    <span className='text-sm'>{mb.facilities.length > 3 && `+${mb.facilities.length - 3} more`}</span>
                                </div>
                            </div>
                        </div>
                        <div className='p-8 border border-bleached-cedar-200 dark:border-bleached-cedar-900 rounded-lg bg-bleached-cedar-50 dark:bg-bleached-cedar-950 dark:text-bleached-cedar-50'>
                            <h1 className='font-bold'>Details of Booking</h1>
                            <div className='mt-5 flex flex-col gap-2'>
                               
                                <h1 className='font-bold'> Name: {" "}
                                    <span className='font-normal'>{mb.bookings.firstName} {mb.bookings.lastName}</span>
                                </h1>
                                <p className='font-bold'>Guest:  {" "}
                                    <span className='font-normal'>{mb.bookings.adultCount} Adult, {mb.bookings.childCount} Child</span>
                                </p>
                                <p className='font-bold'>
                                    CheckIn : {" "}
                                    <span className='font-normal'>
                                        {mb.bookings.checkIn ? new Date(mb.bookings.checkIn).toDateString() : 'N/A'}
                                    </span>  
                                    
                                </p>
                                <p className='font-bold'>
                                    CheckOut : {" "}
                                    <span className='font-normal'>
                                    {mb.bookings.checkOut ? new Date(mb.bookings.checkOut).toDateString() : 'N/A'}
                                    </span>  
                                     
                                </p>
                                <p className='font-bold'>
                                    TotalCost: {" "}
                                    <span className='font-normal'>{mb.bookings.totalCost}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyBookings