import BookingDetailSummary from '@/components/Authenticated/BookingDetailSummary'
import BookingForm from '@/components/forms/BookingForm'
import { useAppContext } from '@/context/AppContext'
import { useSearchContext } from '@/context/SearchContext'
import useMetaTags from '@/hooks/useMetaTags'
import { useFetchCurrentUser } from '@/services/api/Auth'
import { useCreatePaymentIntent, UseGetHotelDetailsById } from '@/services/api/Room'
import {Elements} from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Booking = () => {
  useMetaTags('Book Hotel', 'Add Hotel')
  const {stripePromise} = useAppContext()
  const search = useSearchContext()
  const{hotelId} = useParams()
  const [numberOfNights, setNumberOfNights] = useState<number>(0)

  const {data:Roomdata, isLoading:RoomdataLoading} = UseGetHotelDetailsById(hotelId as string)
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
        setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut,numberOfNights]);
 
  const {data:currentUser, isLoading} = useFetchCurrentUser()

  const {data:paymentIntentData, isLoading: paymentLoading, } = useCreatePaymentIntent(
    hotelId as string,
    numberOfNights.toString()
  );


  if (isLoading || RoomdataLoading || paymentLoading) return




 
  return (
    <div className='container grid md:grid-cols-[1fr_2fr] gap-4'>
    <BookingDetailSummary 
      checkIn={search.checkIn} 
      checkOut={search.checkOut} 
      adultCount={search.adultCount}
      childCount={search.childCount}
      numberOfNights={numberOfNights}
      hotel={Roomdata!}
    />
    {currentUser && numberOfNights > 0 && paymentIntentData && (
      <Elements 
        stripe={stripePromise}
        options={{
          clientSecret: paymentIntentData?.clientSecret
        }}
      >
        <BookingForm currentUser={currentUser!} paymentIntent={paymentIntentData}/>
      </Elements>
    )}
  </div>
  )
}

export default Booking