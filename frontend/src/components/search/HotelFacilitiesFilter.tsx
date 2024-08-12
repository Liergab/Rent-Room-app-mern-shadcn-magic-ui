import { hotelFacilities} from "@/lib/hotel-option-config"

type Props = {
    selectedHotelFacilities: string[]
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void
}

const HotelFaclitiesFilter= ({selectedHotelFacilities, onChange}:Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
        <h4 className="text-base font-semibold mb-2">Property Rating</h4>
        {hotelFacilities.map((facility) =>(
            <label className="flex items-center space-x-2" key={facility}>
                <input 
                    type="checkbox"  
                    className="rounded" 
                    value={facility} 
                    checked={selectedHotelFacilities.includes(facility)} 
                    onChange={onChange}
                />
                <span>{facility} Facility</span>
            </label>
        ))}
    </div>
  )
}

export default HotelFaclitiesFilter