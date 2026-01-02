import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col lg:flex-row md:flex-row justify-around gap-12 sm:gap-10 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700' >
        
    {/* Feature 1: Easy Exchange Policy */}
    <div>
        <img src="src/assets/frontend_assets/exchange_icon.png" className='w-12 m-auto mb-5' alt="Exchange Icon" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
    </div>

    {/* Feature 2: 7 Days Return Policy */}
    <div>
        <img src="src/assets/frontend_assets/quality_icon.png" className='w-12 m-auto mb-5' alt="Quality Icon" />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
    </div>

    {/* Feature 3: Second Exchange Policy (Looks like a duplicate) */}
    <div>
        <img src="src/assets/frontend_assets/support_img.png" className='w-12 m-auto mb-5' alt="Exchange Icon" />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
    </div>
</div>
    
    
  )
}

export default OurPolicy