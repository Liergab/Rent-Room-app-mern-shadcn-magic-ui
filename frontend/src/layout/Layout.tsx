import Footer from "@/components/publicComponent/Footer"
import Header from "@/components/publicComponent/Header"
import Hero from "@/components/publicComponent/Hero"
import { useAppContext } from "@/context/AppContext"

interface props{
    children :React.ReactNode
}

const Layout = ({children}:props) => {

   const {isLoggin} = useAppContext()

    return(
        <div className="bg-white dark:bg-zinc-950 flex flex-col min-h-screen">
            <Header/>
            <Hero/>
            <div className=" bg-white dark:bg-zinc-950 container mx-auto py-10 flex-1">
                {isLoggin && (<h1>sample</h1>)}
                {children}
            </div>
        
            <Footer/>
        </div>
    )
}

export default Layout
