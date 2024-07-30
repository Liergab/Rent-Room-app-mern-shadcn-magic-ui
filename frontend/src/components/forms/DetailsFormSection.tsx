
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForms'
const DetailsFormSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Name
                <input 
                   type='text'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("name") } 
                />
                <p className='text-red-400'>{errors.name?.message}</p>
        </label>
        <div className='flex gap-4'>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                City
                <input 
                   type='text'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("city") } 
                />
                <p className='text-red-400'>{errors.city?.message}</p>
        </label>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Country
                <input 
                   type='text'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("city") } 
                />
                <p className='text-red-400'>{errors.country?.message}</p>
        </label>

        </div>

    </div>
  )
}

export default DetailsFormSection