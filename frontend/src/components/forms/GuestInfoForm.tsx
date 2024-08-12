import { useAppContext }     from '@/context/AppContext';
import { useSearchContext }  from '@/context/SearchContext';
import DatePicker            from 'react-datepicker';
import { useForm }           from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css"


type Props = {
  hoteId: string;
  pricePerNight:number
}
type GuestInfoFormData = {
  checkIn : Date;
  checkOut: Date;
  adultCount: number;
  childCount: number
}
const GuestInfoForm = ({hoteId, pricePerNight}:Props) => {
  const search = useSearchContext()
  const {isLoggin} = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const {register, watch, handleSubmit, setValue, formState:{errors}} = useForm<GuestInfoFormData>({
    defaultValues:{
      checkIn:search.checkIn,
      checkOut:search.checkOut,
      adultCount:search.adultCount,
      childCount:search.childCount
    }
  })

  const checkIn = watch("checkIn")
  const checkOut = watch("checkOut")

  const minDate = new Date();
  const maxDate =new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const onSignInClick = (data:GuestInfoFormData) => {
    search.saveSearchValues("",data.checkIn, data.checkOut,data.adultCount, data.childCount)
    navigate('/sign-in',{state:{from:location}})
  }

  const onSubmit = (data:GuestInfoFormData) => {
    search.saveSearchValues("",data.checkIn, data.checkOut,data.adultCount, data.childCount)
    navigate(`/hotel/${hoteId}/booking`)
  }

  return (
    <div className='flex flex-col p-4 bg-bleached-cedar-200'>
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form  onSubmit={isLoggin ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className='grid grid-cols-1 gap-4 items-center'>
          <div>
            <DatePicker 
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn",date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText='Check in Date'
              className='min-w-full bg-white p-2 focus:outline-none'
              wrapperClassName='min-w-full'
            />
          </div>
          <div className='z-50'>
            <DatePicker 
              selected={checkOut}
              onChange={(date) => setValue('checkOut',date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText='Check out Date'
              className='min-w-full bg-white p-2 focus:outline-none'
              wrapperClassName='min-w-full'
            />
            </div>
            <div className='grid grid-cols-2 bg bg-white px-2 py-1'>
              <label className=' flex items-center '>
                Adults:
                <input 
                  type="number" 
                  className='w-full p-1 focus:outline-none font-bold' 
                  min={1} max={20} 
                  {...register('adultCount', {
                    required:"This field is required",
                    min:{
                      value:1,
                      message:"There must be atleast one adult"
                    },
                    valueAsNumber:true
                  })}
                />
                {errors.adultCount && <span className='text-red-400'>{errors.adultCount.message}</span>}
              </label>
              <label className='flex items-center '>
                Child:
                <input 
                  type="number" 
                  className='w-full p-1 focus:outline-none font-bold' 
                  min={0} max={20} 
                  {...register('childCount', {
                    valueAsNumber:true
                  })}
                />
                {errors.childCount && <span className='text-red-400'>{errors.childCount.message}</span>}
              </label>
            </div>
            {isLoggin ? (
              <button className='bg-bleached-cedar-600 text-bleached-cedar-200 p-2 font-bold'> book Now</button>
            ): (
              <button className='bg-bleached-cedar-600 text-bleached-cedar-200 p-2 font-bold'>Sign in to Book</button>
            )}
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm