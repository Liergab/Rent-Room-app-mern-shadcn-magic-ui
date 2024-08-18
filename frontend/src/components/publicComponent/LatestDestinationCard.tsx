import { HotelType } from '@/types'
import { Link } from 'react-router-dom'
type Props ={
    hotel:HotelType
}
const LatestDestinationCard = ({hotel}:Props) => {
  return (
   <Link to={`/detail/${hotel._id}`} className='relative cursor-pointer overflow-hidden rounded-md'>
    <div className='h-[300px]'>
        <img src={hotel.imageUrls[0]} alt="image"  className='w-full h-full object-cover object-center'/>
    </div>
    <div className='absolute bottom-0 p-4 bg-bleached-cedar-950 hover:bg-black hover:bg-opacity-55 bg-opacity-50 w-full rounded-b-md'>
        <span className='text-bleached-cedar-50 font-bold tracking-tighter text-3xl'>
            {hotel.name}
        </span>
    </div>
   </Link>
  )
}

export default LatestDestinationCard