import LatestDestinationCard from '@/components/publicComponent/LatestDestinationCard'
import { Skeleton } from '@/components/ui/skeleton'
import useMetaTags from '@/hooks/useMetaTags'
import { useGetLatestHotel } from '@/services/api/Room'


const HomePage = () => {
  useMetaTags('Home','HomePege')
  const{data:hotel, isLoading} = useGetLatestHotel()
  const   topRowHotels = hotel?.slice(0,2)|| []
  const bottomRowHotels = hotel?.slice(2) || []
  
  if (isLoading) {
    return (
      <div className='container space-y-3'>
        <h2 className='text-3xl font-bold'>Latest Destination</h2>
        <p>Most Recent Destination Added by our hosts</p>
        <div className='grid gap-4'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

 
  return (
    <div className='container space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Destination</h2>
      <p>Most Recent Destination Added by our hosts</p>
      <div className='grid gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {topRowHotels.map((top) => (
            <LatestDestinationCard hotel={top} key={top._id}/>
          ))}
        </div>
        <div className='grid md:grid-cols-3  gap-4'>
          {bottomRowHotels.map((top) => (
            <LatestDestinationCard hotel={top} key={top._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage