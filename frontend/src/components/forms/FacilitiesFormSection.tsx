import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForms'
import { hotelFacilities } from '@/lib/hotel-option-config'
const FacilitiesFormSection = () => {

    const{register, formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div>
        <h2 className='text-2xl font-bold mb-3'>Facilities</h2> 
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap:2 md:gap-3'>
            {hotelFacilities.map((facility) =>(
                <label className='text-sm flex gap-1 text-gray-700' key={facility}>
                    <input type="checkbox"  value={facility} {...register('facilities')}/>
                    <span className='text-[12px] md:text-[16px]' >{facility}</span>
                </label>
            ))}
        </div>     
        <p className='text-red-400'>{errors.facilities?.message}</p>
    </div>
  )
}

export default FacilitiesFormSection