
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForms'

const GuestsSection = () => {
    const{register, formState:{errors}} = useFormContext<HotelFormData>()
  return (
    <div>
        <h2 className='text-2xl font-bold mb-3'>Guest</h2> 
        <div className='flex items-center bg-gray-300 p-6 gap-4'>
        <label className='text-gray-700 text-normal dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Adult
                <input 
                   type='number'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("adultCount", { valueAsNumber: true }) } 
                />
                <p className='text-red-400'>{errors.adultCount?.message}</p>
        </label>
        <label className='text-gray-700 text-normal dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Children
                <input 
                   type='number'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("childCount", { valueAsNumber: true }) } 
                />
                <p className='text-red-400'>{errors.childCount?.message}</p>
        </label>
        </div>

    </div>
  )
}

export default GuestsSection