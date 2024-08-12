/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer          from '@/components/publicComponent/Footer'
import Header          from '@/components/publicComponent/Header'
import { useForm }     from 'react-hook-form';
import { loginSchema } from '@/Schemas/FormSchema';
import { z }           from 'zod';
import { Button }      from '@/components/ui/button';
import { useLogin}     from '@/services/api/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect }   from 'react';
import toast           from 'react-hot-toast';
import { AxiosError }  from 'axios';
import useMetaTags     from '@/hooks/useMetaTags';
import { useAppContext } from '@/context/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type LoginFormProps = z.infer<typeof loginSchema>

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}
const Login = () => {

  const location = useLocation()
  useMetaTags('Login-RentRoom', 'Sign in  to RentRoom and find a place for your stay castion')
  const {setIsLoggin} = useAppContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const UserLogin = useMutation({
    mutationFn:useLogin,
     onSuccess:() => {
            toast.success('successfully register')
            setIsLoggin(true)
            queryClient.invalidateQueries({queryKey:['verifyToken']})
            
            navigate(location.state?.from?.pathname || '/')
        }
  })

  const {register,  
         handleSubmit,
         formState, 
         reset, 
         formState:{errors, isSubmitting, isSubmitSuccessful}} = useForm<LoginFormProps>({
         resolver:zodResolver(loginSchema),
         defaultValues:{
          
          }
  });

  const onSubmit = async(value:LoginFormProps) => {
    try {
      await UserLogin.mutateAsync(value)
      
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-5 max-w-96 mx-auto mt-20 background-register-login  px-4 py-4 rounded-lg border-[1px] border-bleached-cedar-300 dark:border-bleached-cedar-950 ">
            <h2 className='text-3xl font-bold text-bleached-cedar-800 dark:text-bleached-cedar-300'>Login</h2>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Email
                <input 
                   type='email'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("email") } 
                />
                <p className='text-red-400'>{errors.email?.message}</p>
            </label>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Password
                <input 
                   type='password'
                  className="border rounded w-full text-gray-700 focus:text-gray-700  py-1 px-2 font-normal" 
                  {...register("password") } 
                />
                <p className='text-red-400'>{errors.password?.message}</p>
            </label>
            <div className='flex items-center justify-between'>
              <p className='text-[12px]'>Not Registered? {" "} 
                <Link to="/sign-up" className='underline'>Create an account here</Link>
              </p>
              <Button disabled={isSubmitting } type='submit' className='button-auth-form bg-white hover:bg-bleached-cedar-300 dark:hover:bg-bleached-cedar-700 dark:bg-bleached-cedar-950'>{isSubmitting ? 'Loading..' : 'Submit'}</Button>
            </div>
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Login