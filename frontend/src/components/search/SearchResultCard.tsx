import { HotelType } from '@/types'
import {AiFillStar} from 'react-icons/ai'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


const SearchResultCard = ({room}:{ room:HotelType}) => {
 
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-bleached-cedar-500 rounded-lg p-8 gap-8' key={room._id}>
         <div className='w-full h-[300px] '>
           <img src={room?.imageUrls[0]} alt='image' className='w-full h-full object-cover object-center rounded-md'/>
         </div>
         <div className='grid grid-rows-[1fr_2fr_1fr] gap-4'>
            <div>
                <div className='flex items-center'>
                    {Array.from({ length: room?.starRating }).map((_, index) => (
                        <div key={index}>
                        <AiFillStar className='fill-yellow-400' />
                        </div>
                    ))}
                    <span className='ml-1 text-sm'>{room.type}</span>
                </div>
                <Link to={`/detail/${room._id}`} className='text-2xl font-bold cursor-pointer'>{room.name}</Link>
            </div>
            <div>
                <div className='line-clamp-4'>
                    {room.description}
                </div>
            </div>
            <div className='grid grid-cols-2 items-end whitespace-nowrap'>
                <div className='flex gap-1 items-center flex-wrap'>
                    {room.facilities.slice(0, 3).map((facilities, index) => (
                        <span className='bg-bleached-cedar-50 dark:bg-bleached-cedar-950 dark:text-bleached-cedar-50  border border-bleached-cedar-400 p-2 rounded-lg text-xs whitespace-nowrap ' key={index}>
                            {facilities}
                        </span>
                    ))}
                    <span className='text-sm'>{room.facilities.length > 3 && `+${room.facilities.length - 3} more`}</span>
                </div>
                <div className='flex flex-col items-end gap-1'>
                    <span className='font-bold text-sm md:text-base'>${room.pricePerNight} per night</span>
                    <Link to={`/detail/${room._id}`}>
                        <Button className='max-w-fit text-sm md:text-xl dark:bg-bleached-cedar-800 dark:text-bleached-cedar-50'>View More</Button>
                    </Link>
                </div>
            </div>
         </div>
    </div>
  )
}

export default SearchResultCard