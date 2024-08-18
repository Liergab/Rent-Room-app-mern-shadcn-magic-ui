
import { BookingFormData } from '@/components/forms/BookingForm';
import { HotelSearchResponse, HotelType, paymentIntentResponse, RoomType } from '@/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://rent-room.onrender.com/';


export type SearchParams = {
    destination? : string;
    checkIn?     : string; 
    checkOut?    : string; 
    adultCount?  : string; 
    childCount?  : string; 
    page?        : string;
    facilities?  : string[];
    types?       : string[];
    stars?       : string[];
    sortOption?  : string;
    maxPrice?    : string;
}  

export const useCreateRoom = async(roomData:FormData) => {
    const response = await axios.post(`${BASE_URL}api/v1/my-hotels`, roomData,{
        headers:{
            'content-type':'multipart/form-data'
        },
        withCredentials:true
    })
    return response.data
}


export const useGetAllRoomByOwner = ():UseQueryResult<RoomType[]>=> {
    return useQuery<RoomType[]>({
        queryKey:['getAllRoomByOwner'],
        queryFn:async()=> {
            const response = await axios.get(`${BASE_URL}api/v1/my-hotels`,{
                withCredentials:true
            })

            return response.data
        }
    })
}


export const useGetRoomById = (id:string) => {
    return useQuery({
        queryKey:['getRoomById', id],
        queryFn:async() => {
            const response = await axios.get(`${BASE_URL}api/v1/my-hotels/${id}`,{
                withCredentials:true
            })
            return response.data
        }
    })
}

export const useUpdateRoom = async(roomData:FormData) => {
    const response = await axios.put(`${BASE_URL}api/v1/my-hotels/${roomData.get('hotelId')}`, roomData,{
        headers:{
            'content-type':'multipart/form-data'
        },
        withCredentials:true
    })
    return response.data
}


export const useSearchRoom = (searchParams: SearchParams):UseQueryResult<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
   

    if (searchParams.stars) {
        if (searchParams.stars.length === 0) {
          queryParams.append('stars', ''); 
        } else {
          searchParams.stars.forEach(star => queryParams.append('stars', star.toString()));
        }
      }

    if (searchParams.facilities) {
        searchParams.facilities.forEach(facility => queryParams.append("facilities", facility)); 
    }
    if (searchParams.types) {
        searchParams.types.forEach(type => queryParams.append("types", type.toString()));
    }
    return useQuery({
        queryKey: ['searchRoom', searchParams],
        queryFn: async (): Promise<HotelSearchResponse> => {
            const response = await axios.get(`${BASE_URL}api/v1/search?${queryParams}`, {
                withCredentials: true
            });
            return response.data;
        }
    });
};

export const UseGetHotelDetailsById = (id:string):UseQueryResult<RoomType> => {
    return useQuery({
        queryKey:['hotelDetails', id],
        queryFn:async():Promise<RoomType> => {
        const response = await axios.get(`${BASE_URL}api/v1/find/${id}`,{
            withCredentials:true
        })
        return response.data
        }
    })
}

export const useCreatePaymentIntent = (hotelId:string, numberOfNights:string):UseQueryResult<paymentIntentResponse> => {
    return useQuery({
        queryKey:['createPayment'],
        enabled: !!hotelId && parseInt(numberOfNights, 10) > 0, 
        queryFn:async():Promise<paymentIntentResponse> => {
            const response = await axios.post(`${BASE_URL}api/v1/${hotelId}/bookings/payment-intent`,{numberOfNights},{
                headers:{
                    'content-type':'application/json'
                },
                withCredentials:true
            })
            return response.data
        }
    })
   
}

export const useCreateRoomBooking = async(formData:BookingFormData) => {
    
    const response = await axios.post(`${BASE_URL}api/v1/${formData.hotelId}/bookings`,{formData},{
        headers:{
                'content-type':'application/json'
        },
                withCredentials:true
     })
    return response.data
}

export const useGetMyBookings = ():UseQueryResult<HotelType[]> => {
    return useQuery({
        queryKey:['getMyBookings'],
        queryFn:async():Promise<HotelType[]> => {
            const response = await axios.get(`${BASE_URL}api/v1/my-bookings`,{
                withCredentials:true
            })

            return response.data
        }
    })
}

export const useGetLatestHotel = ():UseQueryResult<HotelType[]> => {
    return useQuery({
        queryKey:['latestHotel'],
        queryFn:async():Promise<HotelType[]> => {
            const response = await axios.get(`${BASE_URL}api/v1/hotel`,{
                withCredentials:true
            })
            return response.data
        }
    })
}
