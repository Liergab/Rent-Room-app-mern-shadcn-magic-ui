import { UseGetHotelDetailsById } from '@/services/api/Room'
import { useParams } from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import GuestInfoForm from '@/components/forms/GuestInfoForm'

const Details = () => {
    const {id} = useParams()
    const {data:RoomData} = UseGetHotelDetailsById(id as string)

   if(!RoomData){
    return<></>
   }

  return (
    <div className=' container space-y-6 '>
        <div>
            <span className='flex'>
                {Array.from({length:RoomData?.starRating}).map((_, index) => (
                    <div key={index}>
                        <AiFillStar className='fill-yellow-400' />
                    </div>
                ))}
            </span>
            <h1 className='text-3xl font-bold'>{RoomData.name}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {RoomData.imageUrls.map((url, index) => (
                <div className='h-[300px]' key={index}>
                    <img 
                        src={url} 
                        alt="image" 
                        className='rounded-md w-full h-full object-cover object-center'
                    />
                </div>
            ))}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
            {RoomData?.facilities.map((facility, index) => (
                <div className='border border-bleached-cedar-500 rounded-sm p-3' key={index}>
                    {facility}
                </div>
            ))}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10'>
            <div className='whitespace-pre-line'>
                {RoomData?.description}
            </div>
            <div className='h-fit'>
                <GuestInfoForm pricePerNight={RoomData.pricePerNight} hoteId={RoomData._id}/>
            </div>
        </div>
    </div>
  )
}

export default Details