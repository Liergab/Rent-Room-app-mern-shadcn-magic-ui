import { useSearchContext } from '@/context/SearchContext';
import { useCreateRoomBooking } from '@/services/api/Room';
import { paymentIntentResponse, UserType } from '@/types'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

type Props ={
    currentUser:UserType;
    paymentIntent:paymentIntentResponse
}

export type BookingFormData = {
    firstName  : string;
    lastName   : string;
    email      : string
    adultCount : number;
    childCount : number;
    checkIn    : string;
    checkOut   : string;
    hotelId    : string;
    totalCost  : number
    paymentIntentId:string
}


const BookingForm = ({currentUser,paymentIntent}:Props) => {
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const {hotelId} = useParams()
    const search = useSearchContext()
    const queryClient = useQueryClient()

    const {handleSubmit, register} = useForm<BookingFormData>({
        defaultValues:{
            firstName:currentUser.firstName,
            lastName:currentUser.lastName,
            email:currentUser.email,
            adultCount:search.adultCount,
            childCount:search.childCount,
            checkIn:search.checkIn.toISOString(),
            checkOut:search.checkOut.toISOString(),
            hotelId:hotelId,
            totalCost:paymentIntent.totalCost,
            paymentIntentId:paymentIntent.paymentIntentId
        }
    })

    const createRoomBooking = useMutation({
        mutationFn:useCreateRoomBooking,
        onSuccess:() => {
            toast.success('Booking Save')
            queryClient.invalidateQueries({queryKey:['getMyBookings']})
            setTimeout(() => {
                navigate('/bookings')
            }, 4000)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        },onError:(error:any) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Error: ${error.response.data.message}`);
              } else {
                toast.error('Error saving Booking');
              }
        }
    })
    const onSubmit = async(formData:BookingFormData) => {
        if(!stripe || !elements){
            return;
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method:{
                card:elements.getElement(CardElement) as StripeCardElement
            }
        })

        if(result.paymentIntent?.status === "succeeded"){
           await createRoomBooking.mutateAsync({...formData, paymentIntentId:result.paymentIntent.id})

        }
    }

  return (
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-5 rounded-lg border border-bleached-cedar-300 p-5 '>
            <span className='text-3xl font-bold'>Confirm Your Details</span>
            <div className='grid grid-cols-2 gap-6'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name
                    <input  className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal '
                            type="text" 
                            readOnly 
                            disabled 
                            {...register('firstName')}
                    />
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input  className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal '
                            type="text" 
                            readOnly 
                            disabled 
                            {...register('lastName')}
                    />
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                   Email
                    <input  className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal '
                            type="text" 
                            readOnly 
                            disabled 
                            {...register('email')}
                    />
                </label>
            </div>
            <div className='space-y-2'>
                <h2 className='font-semibold text-lg'>Your Price</h2>
                <div className='bg-blue-200 p-4 rounded-md'>
                    <div className='font-semibold text-lg'>
                        Total Cost: ${paymentIntent?.totalCost}
                    </div>
                    <div className='font-semibold text-lg'>
                    Includes Taxes and charges
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <h3 className='text-xl font-semibold'>Payment Details</h3>
                <CardElement id="payment-element" className='border rounded-md p-2 text-sm'/>
            </div>
            <div className='flex justify-end'>
                <button disabled={createRoomBooking.isPending} type="submit" className='bg-blue-600 text-white p-2 font-bold'>
                    {createRoomBooking.isPending ?  'Saving...' : 'Confirm Booking'}
                    </button>
            </div>
        </form>
  )
}

export default BookingForm