import React from 'react'

const Footer = () => {
  return (
    <div className='bg-white dark:bg-zinc-950 py-10 text-black dark:text-white border-t border-gray-400 dark:border-zinc-900 '>
      <div className='container mx-auto flex justify-between items-center'>
        <span className='text-3xl  font-bold -tracking-tight'>BGR</span>
        <span className=' font-bold -tracking-tight flex gap-4'>
            <p className='cursor-pointer'>Privacy Policy</p>
            <p className='cursor-pointer'>Term of Services</p>
        </span>


      </div>
    </div>
  )
}

export default Footer