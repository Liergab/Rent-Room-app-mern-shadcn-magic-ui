import { Link } from 'react-router-dom'
import logo from '../../assets/images/rr-logo.png'

const Footer = () => {
  return (
    <div className='bg-white dark:bg-zinc-950 py-10 text-black dark:text-white border-t border-gray-400 dark:border-zinc-900 px-4 md:px-0 '>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className="">
              <img src={logo} alt=""  className="w-28 md:w-40"/>
        </Link>
        <span className=' font-bold -tracking-tight flex flex-col items-center md:flex-row gap-4 '>
            <p className='navlinks-text navlinks-hover'>Privacy Policy</p>
            <p className='navlinks-text navlinks-hover'>Term of Services</p>
        </span>


      </div>
    </div>
  )
}

export default Footer