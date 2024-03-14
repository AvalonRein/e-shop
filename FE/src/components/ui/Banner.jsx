import React from 'react'

export default function Banner() {
  return (
    <div className='banner shadow-xl'>
      <div className="relative">
        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg" alt="" className='w-full max-h-[80vh] ' />
        <div className="absolute top-0 bottom-0 w-full opacity-30 bg-black z-[1]"></div>
        <div className="absolute h-full w-full flex flex-col justify-center items-center z-10 top-0 bottom-0">
          <div className=' w-1/2 text-center grid grid-cols-1 justify-center gap-5 text-white'>
            <h1 className=' text-4xl font-bold'>Long-term thinking</h1>
            <p>We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us to focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of the universe.</p>
           <div className='flex justify-center'>
           <button className='w-[200px] rounded-md text-center !bg-gradient-to-r from-gray-500 to-gray-800 font-semibold py-3 '>Read Our Story</button>
           </div>
          </div>

        </div>
      </div>
    </div>
  )
}
