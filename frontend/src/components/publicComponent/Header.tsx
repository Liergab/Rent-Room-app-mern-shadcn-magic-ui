import { Link } from "react-router-dom"
import DarkModeToggle from "../DarModeToggle"
import { Button } from "../ui/button"
import { useAppContext } from "@/context/AppContext"



const Header = () => {
    const{isLoggin} =useAppContext()
    console.log(isLoggin)
  return (
    <div className="bg-white dark:bg-zinc-950 py-6 text-black dark:text-white border-b border-gray-300 dark:border-zinc-900 ">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl  font-bold tracking-tight">
                <Link to='/' className="">
                    BGR
                </Link>
            </span>
            <span className="flex items-center space-x-2">
                <DarkModeToggle/>
                {
                    isLoggin ? 
                    <>
                      <Link to='/my-bookings'>
                            <Button variant="outline" className=" rounded-xl border-2 border-bleached-cedar-800 dark:bg-bleached-cedar-950 text-bleached-cedar-700 dark:text-bleached-cedar-100" type="button">Booking</Button>
                      </Link>
                      <Link to='/my-hotel'>
                            <Button variant="outline" className=" rounded-xl border-2 border-bleached-cedar-800 dark:bg-bleached-cedar-950 text-bleached-cedar-700 dark:text-bleached-cedar-100" type="button">My Hotel</Button>
                        </Link>
                    </>      :
                    <>
                        <Link to='/sign-in'>
                            <Button variant="outline" className=" rounded-xl border-2 border-bleached-cedar-800 dark:bg-bleached-cedar-950 text-bleached-cedar-700 dark:text-bleached-cedar-100" type="button">Sign in</Button>
                        </Link>
                    </>
                }
               
                
            </span>
        </div>
    </div>
  )
}

export default Header