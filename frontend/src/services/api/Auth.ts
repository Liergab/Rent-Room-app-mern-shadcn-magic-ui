import { RegisterFormProps } from '@/Page/publicPage/Register';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const useRegister = async(userData:RegisterFormProps)=> {
    const response = await axios.post(`${BASE_URL}/users/register`,userData,{
        headers:{
            'content-type':'application/json'
        } ,
        withCredentials: true
    })
    return response.data
}

