import { hotelTypes } from "@/lib/hotel-option-config"
import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../ManageHotelForms"

const TypesFormSection = () => {
  const{register, watch,formState:{errors}} = useFormContext<HotelFormData>()
  const typeWatch = watch("type")
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 z-50">Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  dark:text-black">
        {hotelTypes.map((type) => (
          <label key={type} className={typeWatch === type ? "cursor-pointer bg-bleached-cedar-500 text-[12px] md:text-sm rounded-full px-4 py-2 font-semibold flex items-center justify-center z-50" : "cursor-pointer bg-bleached-cedar-200 text-sm rounded-full px-4 py-2 font-semibold flex items-center justify-center z-50"}> 
            <input type="radio" value={type}  {...register('type')} className="hidden"/>
            <span className="text-[10px] md:text-[14px] font-normal">{type}</span>
          </label>
        ))}
      </div>
      <p className='text-red-400'>{errors.type?.message}</p>
    </div>
  )
}

export default TypesFormSection