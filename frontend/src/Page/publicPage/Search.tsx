import SearchResultCard from '@/components/search/SearchResultCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchContext } from '@/context/SearchContext'
import { useSearchRoom } from '@/services/api/Room'
import { HotelType } from '@/types'
import { useState } from 'react'

const Search = () => {

  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const searchParams = {
    destination:search.destination,
    checkIn :search.checkIn.toISOString(),
    checkOut:search.checkOut.toISOString(),
    adultCount : search.adultCount.toString(),
    childCount :search.childCount.toString(),
    page : page.toString()
  } 
  const { data: RoomData, isLoading, isError } = useSearchRoom(searchParams);

 
  if (isLoading) return (
    <div className='container grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 h-fit sticky top-10'>
        <Skeleton className="w-full h-[400px] rounded-lg" />
      </div>
      <div className='flex flex-col gap-5'>
        <Skeleton className="w-[200px] h-[24px] rounded-lg" />
        <div className='grid grid-cols-1 gap-5'>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[300px] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
  if (isError) return <div>Error fetching data...</div>;

  return (
    
    <div className='container grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 h-fit sticky top-10'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>Filter by:</h3>
          {'Todo'}
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
            <span className='text-xl font-bold'>
              {RoomData?.pagination.total} hotels found {" "}
              {search.destination ? `in ${search.destination}` : ''}
            </span>
          </div>
          {/* Todo Sort */}
          {RoomData?.data.map((room:HotelType) => (
            <SearchResultCard room={room} key={room._id}/>
          ))}
      </div>
     
    </div>
  )
}

export default Search