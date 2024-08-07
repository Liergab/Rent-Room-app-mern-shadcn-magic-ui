
import { useFormContext } from 'react-hook-form'
import { HotelFormData }  from '../ManageHotelForms'


const DetailsFormSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div className='flex flex-col gap-4 z-50'>
        
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Name
                <input 
                   type='text'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal border-bleached-cedar-500 dark:bg-bleached-cedar-100" 
                  {...register("name") } 
                />
                <p className='text-red-400'>{errors.name?.message}</p>
        </label>
        <div className='flex gap-4'>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                City
                <input 
                   type='text'
                  className="border  rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal  border-bleached-cedar-500 dark:bg-bleached-cedar-100" 
                  {...register("city") } 
                />
                <p className='text-red-400'>{errors.city?.message}</p>
        </label>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Country
                <input 
                   type='text'
                  className="border  rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal  border-bleached-cedar-500 dark:bg-bleached-cedar-100 " 
                  {...register("country") } 
                />
                <p className='text-red-400'>{errors.country?.message}</p>
        </label>
        </div>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Description
                <textarea
                   rows={10}
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal  border-bleached-cedar-500 dark:bg-bleached-cedar-100" 
                  {...register("description") } 
                />
                <p className='text-red-400'>{errors.description?.message}</p>
        </label>
      <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold max-w-[50%] '>
                Price per Night
                <input 
                   type='number'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal  border-bleached-cedar-500 dark:bg-bleached-cedar-100" 
                  {...register("pricePerNight", { valueAsNumber: true }) } 
                />
                <p className='text-red-400'>{errors.pricePerNight?.message}</p>
        </label>
        <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold max-w-[50%]  '>
                Star Rating
                <select {...register("starRating", { valueAsNumber: true })} className='border rounded w-full p-2 text-gray-700 font-normal  border-bleached-cedar-500  dark:bg-bleached-cedar-100'> 
                  <option value="" className='text-sm font-bold'>
                    Select as Ratingz
                  </option>
                  {[1,2,3,4,5].map((num, index) => (
                    <option value={num} key={index}>
                        {num}
                    </option>
                  ))}
                </select>
                <p className='text-red-400'>{errors.starRating?.message}</p>
        </label>
    </div>
  )
}

export default DetailsFormSection