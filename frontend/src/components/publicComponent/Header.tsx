import { Link, useNavigate } from "react-router-dom"
import DarkModeToggle        from "../DarModeToggle"
import { Button }            from "../ui/button"
import { useAppContext }     from "@/context/AppContext"
import { useMutation, useQueryClient }       from "@tanstack/react-query"
import { useLogout }         from "@/services/api/Auth"
import toast                 from "react-hot-toast"
import logo                  from '../../assets/images/rr-logo.png'
import { CiMenuFries } from "react-icons/ci";
import React from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"



const Header = () => {
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const{isLoggin} =useAppContext()
    const LogoutUser = useMutation({
        mutationFn:useLogout,
        onSuccess: () => {
            toast.success('Logout successfull')
          queryClient.invalidateQueries({queryKey:['verifyToken']})
          queryClient.resetQueries({queryKey:['getAllRoomByOwner']})
            navigate('/');
          },
          onError: (error) => {
            console.error('Logout failed:', error);
          }
    })

    const logoutButton = () => {
            LogoutUser.mutateAsync();   
            
    }
    
  return (
    <div className="bg-white dark:bg-zinc-950 py-6 text-black dark:text-white border-b border-gray-300 dark:border-zinc-900 px-4 md:px-0 ">
        <div className="container mx-auto flex items-center justify-between">
            <span className="text-3xl  font-bold tracking-tight">
                <Link to='/' className="">
                    <img src={logo} alt=""  className=" w-32 md:w-40"/>
                </Link>
            </span>
            <span className="hidden md:flex items-center space-x-4 ">
                {
                    isLoggin ? 
                    <React.Fragment>
                      <Link to='/my-bookings' className="navlinks-hover">
                            <h1 className="navlinks-text">Booking</h1>
                      </Link>
                      <Link to='/my-hotel' className="navlinks-hover">
                      <h1 className="navlinks-text">My Hotels</h1>
                      </Link>
                      <Button variant="outline" className="button-navbar text-bleached-cedar-700"   type="button" onClick={logoutButton}>
                        Sign out
                     </Button>
                    
                    </React.Fragment>      :
                    <React.Fragment>
                        <Link to='/sign-in'>
                            <Button variant="outline"  className="button-navbar " type="button">Sign in</Button>
                        </Link>
                    </React.Fragment>
                }

                <DarkModeToggle/>
            </span>
            <div className=" inline md:hidden">
            <Menubar className="border border-bleached-cedar-800">
              <MenubarMenu>
                <MenubarTrigger><CiMenuFries color="#80498a" className="text-base font-bold"/></MenubarTrigger>
                <MenubarContent>
                {
                    isLoggin && <>
                      <MenubarItem>
                        <Link to='/my-bookings' className="navlinks-hover">
                              <h1 className="navlinks-text">Booking</h1>
                        </Link>
                      </MenubarItem>
                    
                    </>
                  }

                  {
                    isLoggin && <>
                     <MenubarItem>
                      <Link to='/my-hotel' className="navlinks-hover">
                        <h1 className="navlinks-text">My Hotels</h1>
                      </Link>
                    </MenubarItem>
                    </>
                  }
                  {isLoggin && <><MenubarSeparator /></>}
                  <MenubarItem>
                    {isLoggin ? <>
                      <Button variant="outline" className="button-navbar text-bleached-cedar-700"   type="button" onClick={logoutButton}>
                        Sign out
                     </Button>
                    </>:<>
                    <Link to='/sign-in'>
                            <Button variant="outline"  className="button-navbar " type="button">Sign in</Button>
                        </Link>
                    </>
                    
                  }
                  </MenubarItem>
                  <MenubarItem>
                      <DarkModeToggle/>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            </div>
          
        </div>
    </div>
  )
}

export default Header