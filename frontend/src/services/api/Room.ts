
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