import Footer from '@/components/publicComponent/Footer'
import Header from '@/components/publicComponent/Header'
import { useForm } from 'react-hook-form';

type RegisterFormData ={
  firstName : string;
  lastName  : string;
  email     : string;
  password  : string;
  confirmPassword: string;
}
const Register = () => {

  const {register, watch} = useForm<RegisterFormData>();
  return (
    <div className='bg-white dark:bg-zinc-950 flex flex-col min-h-screen'>
       
        <Header/>
        <div className='flex-1 container '>
          <form className="flex flex-col  gap-5 max-w-xl mx-auto mt-10 bg-white dark:bg-zinc-900 bg-opacity-15  px-4 py-2 rounded-lg border-[1px] border-bleached-cedar-300 dark:border-bleached-cedar-950 ">
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
              <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                First Name 
                <input 
                  className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                  {...register("firstName" , {required: "FirstName is Required"})}
                />
              </label>
              <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Last Name
                <input 
                  className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                  {...register("lastName", {required: "FirstName is Required"}) } 
                />
              </label>
            </div>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Email
                <input 
                   type='email'
                  className="border rounded w-full text-gray-700 focus:text-gray-700 py-1 px-2 font-normal" 
                  {...register("email", {required: "Email is Required"}) } 
                />
            </label>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Password
                <input 
                   type='password'
                  className="border rounded w-full text-gray-700 focus:text-gray-700  py-1 px-2 font-normal" 
                  {...register("password", {required: "Password is Required"}) } 
                />
            </label>
            <label className='text-gray-700 dark:text-bleached-cedar-100 text-sm font-bold flex-1'>
                Confirm Password
                <input 
                   type='password'
                    className="border rounded text-gray-700 focus:text-gray-700  w-full py-1 px-2 font-normal" 
                    {...register("confirmPassword", {validate:(val) =>{
                      if(!val){
                        return "This field is required!"
                      }else if(watch("password") !== val){
                        return "Your Password do not match"
                      }
                    }})} 
                />
            </label>
            <div>

            </div>
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Register