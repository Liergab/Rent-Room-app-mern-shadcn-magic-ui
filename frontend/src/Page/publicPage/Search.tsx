import HotelFaclitiesFilter from '@/components/search/HotelFacilitiesFilter'
import HotelTypesFilter     from '@/components/search/HotelTypesFilter'
import Pagination           from '@/components/search/Pagination'
import PriceFilter          from '@/components/search/PriceFilter'
import SearchResultCard     from '@/components/search/SearchResultCard'
import StarRatingFilter     from '@/components/search/StarRatingFilter'
import { Skeleton }         from '@/components/ui/skeleton'
import { useSearchContext } from '@/context/SearchContext'
import useMetaTags from '@/hooks/useMetaTags'
import { useSearchRoom }    from '@/services/api/Room'
import { HotelType }        from '@/types'
import { useState }         from 'react'

const Search = () => {
  useMetaTags('Search Hotel', 'Search Hotel')
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStar, setSelectedStar] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("")
  const [selectedHotelTypes,setSelectedHotelTypes] = useState<string[]>([])
  const [selectedHotelFacilities,setSelectedHotelFacilities] = useState<string[]>([])


  const searchParams = {
    destination : search.destination,
    checkIn     : search.checkIn.toISOString(),
    checkOut    : search.checkOut.toISOString(),
    adultCount  : search.adultCount.toString(),
    childCount  : search.childCount.toString(),
    page        : page.toString(),
    stars       : selectedStar,
    types       : selectedHotelTypes,
    facilities  : selectedHotelFacilities,
    maxPrice    : selectedPrice?.toString(),
    sortOption

  } 
  const { data: RoomData, isLoading, isError } = useSearchRoom(searchParams);

  const handleStarChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const starRating = event.target.value

    setSelectedStar((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );

  }

  const handleHotelTypeChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const hotelTypes= event.target.value

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelTypes]
        : prevHotelTypes.filter((type) => type !== hotelTypes)
    );

  }

  const handleHotelFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilities = event.target.value;
  
    setSelectedHotelFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facilities]
        : prevFacilities.filter((facility) => facility !== facilities) 
    );
  };
 
 
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
      <div className='rounded-lg border p-5 border-slate-300 h-fit sticky top-10'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>Filter by:</h3>

            <StarRatingFilter 
              selectedStars={selectedStar} 
              onChange={handleStarChange}
            />
            <HotelTypesFilter 
              selectedHotelTypes={selectedHotelTypes} 
              onChange={handleHotelTypeChange}
            />
            <HotelFaclitiesFilter 
                selectedHotelFacilities={selectedHotelFacilities} 
                onChange={handleHotelFacilitiesChange}
            />
            <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number) => setSelectedPrice(value)}/>

        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
            <span className='text-xl font-bold'>
              {RoomData?.pagination.total} hotels found {" "}
              {search.destination ? `in ${search.destination}` : ''}
            </span>
            <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className='p-2 border rounded-md'>
            <option value=""> Sort By</option>
            <option value="starRating">StarRating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">star Rating(high to low) </option>
          </select>
          </div>
        
          {RoomData?.data.map((room:HotelType) => (
            <SearchResultCard room={room} key={room._id}/>
          ))}
          <div>
            {RoomData?.pagination?.total  === 0 ? ' ' : <>
              <Pagination page={RoomData?.pagination.page || 1}  pages={RoomData?.pagination.pages || 1} onPageChange={(page) => setPage(page)}/>
            </>}
           
          </div>
      </div>
     
    </div>
  )
}

export default Search