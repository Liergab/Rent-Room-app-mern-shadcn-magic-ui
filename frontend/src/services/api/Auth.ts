import { LoginFormProps } from '@/Page/publicPage/Login';
import { RegisterFormProps } from '@/Page/publicPage/Register';
import { UserType } from '@/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://rent-room.onrender.com/';

export const useRegister = async(userData:RegisterFormProps)=> {
    const response = await axios.post(`${BASE_URL}api/v1/users/register`,userData,{
        headers:{
            'content-type':'application/json'
        } ,
        
        withCredentials: true
    })
    return response.data
}


export const useLogout = async () => {
    const response = await axios.get(`${BASE_URL}api/v1/auth/logout`, {
      withCredentials: true, // Add this option
    });
    return response.data;
  };


export const useLogin = async(userData:LoginFormProps) => {
    const response = await axios.post(`${BASE_URL}api/v1/auth/login`, userData,{
        headers:{
            'content-type' :'application/json'
        },
        withCredentials:true
    })
    return response.data
}



export const ValidateToken = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['verifyToken'],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}api/v1/auth/verify-token`,{
                withCredentials:true
            });
            return response.data;
        },
        retry: false, 
    });

    return { data, isLoading, isError };
};


export const useFetchCurrentUser = ():UseQueryResult<UserType> => {
    return useQuery({
        queryKey:['currentUser'],
        queryFn:async():Promise<UserType> =>{
            const  response  = await axios.get(`${BASE_URL}api/v1/users/me`,{
                withCredentials:true
            })
            return response.data
        }
    })
}

