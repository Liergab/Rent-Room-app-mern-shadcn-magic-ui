
import { RoomType } from '@/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';

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