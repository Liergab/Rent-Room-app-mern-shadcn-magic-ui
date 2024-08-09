import { HotelType } from '@/types'
import {AiFillStar} from 'react-icons/ai'


const SearchResultCard = ({room}:{ room:HotelType}) => {
 
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-bleached-cedar-500 rounded-lg p-8 gap-8' key={room._id}>
         <div className='w-full h-[200px] '>
           <img src={room?.imageUrls[0]} alt='image' className='w-full h-full object-cover object-center'/>
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
                <h2 className='text-2xl font-bold cursor-pointer'>{room.name}</h2>
            </div>
            <div>
                <div className='line-clamp-4'>
                    {room.description}
                </div>
            </div>
            <div className='grid grid-cols-2 items-end whitespace-nowrap'>
                <div className='flex gap-1 items-center'>
                    {room.facilities.slice(0, 3).map((facilities, index) => (
                        <span className='bg-slate-300 p-2 rounded-lg text-xs whitespace-nowrap' key={index}>
                            {facilities}
                        </span>
                    ))}
                    <span className='text-sm'>{room.facilities.length > 3 && `+${room.facilities.length - 3} more`}</span>
                </div>

            </div>
         </div>
    </div>
  )
}

export default SearchResultCard