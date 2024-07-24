/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from '@/components/publicComponent/Footer'
import Header from '@/components/publicComponent/Header'
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/Schemas/FormSchema';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRegister } from '@/services/api/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export type RegisterFormProps = z.infer<typeof registerSchema>

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}
const Register = () => {

  const navigate = useNavigate();
  const ResidentRegister = useMutation({
    mutationFn:useRegister,
     onSuccess:() => {
            navigate('/')
        }
  })

  const {register,  
         handleSubmit,
         formState, 
        //  watch,
         reset, 
         formState:{errors, isSubmitting, isSubmitSuccessful}} = useForm<RegisterFormProps>({
         resolver:zodResolver(registerSchema),
         defaultValues:{
          
          }
  });

  const onSubmit = async(value:RegisterFormProps) => {
    try {
      const res = await ResidentRegister.mutateAsync(value)
      console.log(res)
    } catch (e) {
      if (isAxiosError(e)) {
        const errorMessage = (e.response?.data as { message?: string })?.message || 'An error occurred.';
       toast.error(errorMessage)
      } else {
        console.error('Unexpected error:', e);
      }
    }
    
  }

  useEffect(() => {
    if(formState.isSubmitSuccessful){
        reset();
        
    }
  },[formState, isSubmitSuccessful,reset]);

  useEffect(() => {
    if (errors.password) {
      toast.error(errors.password.message!);
    }
    if(errors.email){
        toast.error(errors.email.message!);
    }
    if(errors.firstName){
      toast.error(errors.firstName.message!);
    }
    if(errors.lastName){
    toast.error(errors.lastName.message!);
    }
    if(errors.password_confirmation){
    toast.error(errors.password_confirmation.message!);
    }
  }, [errors.password,
      errors.email, 
      errors.firstName,
      errors.lastName, 
      errors.password_confirmation]);


  return (
    <div className='bg-white dark:bg-zinc-950 flex flex-col min-h-screen'>
       
        <Header/>
        <div className='flex-1 relative container py-10 md:py-0 px-4 '>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-5 max-w-xl mx-auto mt-10 bg-white dark:bg-zinc-900 bg-opacity-15  px-4 py-4 rounded-lg border-[1px] border-bleached-cedar-300 dark:border-bleached-cedar-950 ">
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
              <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                First Name 
                <input 
                  className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                  {...register("firstName")}
                />
              </label>
              <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Last Name
                <input 
                  className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                  {...register("lastName") } 
                />
              </label>
            </div>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Email
                <input 
                   type='email'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("email") } 
                />
            </label>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Password
                <input 
                   type='password'
                  className="border rounded w-full text-gray-700 focus:text-gray-700  py-1 px-2 font-normal" 
                  {...register("password") } 
                />
            </label>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Confirm Password
                <input 
                   type='password'
                    className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                    {...register("password_confirmation")} 
                />
            </label>
            <div>
              <Button disabled={isSubmitting } type='submit'>{isSubmitting ? 'Loading..' : 'Submit'}</Button>
            </div>
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Register