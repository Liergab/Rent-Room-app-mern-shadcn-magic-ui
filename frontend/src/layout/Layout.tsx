import DotPattern from "@/components/magicui/dot-pattern"
import Footer     from "@/components/publicComponent/Footer"
import Header     from "@/components/publicComponent/Header"
import Hero       from "@/components/publicComponent/Hero"
import SearchBar  from "@/components/publicComponent/SearchBar"
import { cn }     from "@/lib/utils"
import { useLocation } from "react-router-dom"


interface props{
    children :React.ReactNode
}

const Layout = ({children}:props) => {
    const location = useLocation();
    const showSearchBar =
    location.pathname === "/" ||
    location.pathname === "/search" ||
    location.pathname.startsWith("/detail/");
    return(
        <div className="bg-white dark:bg-zinc-950 flex flex-col min-h-screen ">
            <Header/>
             <Hero/>
             {showSearchBar && (
                <div className="container px-4 md:px-40">
                <SearchBar />
                </div>
            )}
            <div className="relative bg-white dark:bg-zinc-950 container mx-auto py-10 flex-1 px-4 md:px-0">
            <div className='glow2 absolute top-[60%] right-20 z-10'></div>
            <div className='glow1 absolute top-[20%] left-0 z-10'></div>
                <DotPattern
                    className={cn(
                    "[mask-image:radial-gradient(white,transparent)]",
                    )}
                />
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout
