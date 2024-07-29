/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer              from '@/components/publicComponent/Footer'
import Header              from '@/components/publicComponent/Header'
import { useForm }         from 'react-hook-form';
import { registerSchema }  from '@/Schemas/FormSchema';
import { z }               from 'zod';
import { Button }          from '@/components/ui/button';
import { useMutation, useQueryClient }     from '@tanstack/react-query';
import { useRegister }     from '@/services/api/Auth';
import { zodResolver }     from '@hookform/resolvers/zod';
import { useEffect }       from 'react';
import toast               from 'react-hot-toast';
import { AxiosError }      from 'axios';
import { useNavigate }     from 'react-router-dom';
import useMetaTags from '@/hooks/useMetaTags';

export type RegisterFormProps = z.infer<typeof registerSchema>

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}
const Register = () => {

  useMetaTags('Signup-RentRoom', 'Sign up to RentRoom and find a place for your stay castion')
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const UserRegister = useMutation({
    mutationFn:useRegister,
     onSuccess:() => {
            navigate('/')
            queryClient.invalidateQueries({queryKey:['verifyToken']})
            toast.success('Successfully Register')
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
      const res = await UserRegister.mutateAsync(value)
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

  


  return (
    <div className='bg-white dark:bg-zinc-950 flex flex-col min-h-screen'>
        <Header/>
        <div className='flex-1 relative container py-10 md:py-0 px-4 '>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-5 max-w-xl mx-auto mt-10 background-register-login px-4 py-4 rounded-lg border-[1px] border-bleached-cedar-300 dark:border-bleached-cedar-950 ">
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
              <label className='register-login-label'>
                First Name 
                <input 
                  className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                  {...register("firstName")}
                />
                 <p className='text-red-400'>{errors.firstName?.message}</p>
              </label>
              <label className='register-login-label'>
                Last Name
                <input 
                  className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                  {...register("lastName") } 
                />
                 <p className='text-red-400'>{errors.lastName?.message}</p>
              </label>
            </div>
            <label className='register-login-label'>
                Email
                <input 
                   type='email'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("email") } 
                />
                 <p className='text-red-400'>{errors.email?.message}</p>
            </label>
            <label className='register-login-label'>
                Password
                <input 
                   type='password'
                  className="border rounded w-full text-gray-700 focus:text-gray-700  py-1 px-2 font-normal" 
                  {...register("password") } 
                />
                 <p className='text-red-400'>{errors.password?.message}</p>
            </label>
            <label className='register-login-label'>
                Confirm Password
                <input 
                   type='password'
                    className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                    {...register("password_confirmation")} 
                />
                 <p className='text-red-400'>{errors.password_confirmation?.message}</p>
            </label>
            <div>
              <Button disabled={isSubmitting } type='submit' className='button-auth-form bg-white hover:bg-bleached-cedar-300 dark:hover:bg-bleached-cedar-700 dark:bg-bleached-cedar-950'>{isSubmitting ? 'Loading..' : 'Create Account'}</Button>
            </div>
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Register