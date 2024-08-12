import { hotelTypes } from "@/lib/hotel-option-config"

type Props = {
    selectedHotelTypes: string[]
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void
}

const HotelTypesFilter = ({selectedHotelTypes, onChange}:Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
        <h4 className="text-base font-semibold mb-2">Property Rating</h4>
        {hotelTypes.map((type) =>(
            <label className="flex items-center space-x-2" key={type}>
                <input 
                    type="checkbox"  
                    className="rounded" 
                    value={type} 
                    checked={selectedHotelTypes.includes(type)} 
                    onChange={onChange}
                />
                <span>{type} Types</span>
            </label>
        ))}

    </div>
  )
}

export default HotelTypesFilter 