import React from 'react';

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
      {/* Title/Call to Action */}
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 10% off</p>
      
      {/* Description */}
      <p className='text-gray-600 mt-3'>
        Be the first to know about new arrivals, exclusive discounts, and special collections. 
        Join our community for early access to everything!
      </p>

      {/* Subscription Form */}
      {/* w-full on mobile, w-1/2 from small screens up, horizontally centered with mx-auto */}
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        
        {/* Email Input Field */}
        <input 
          className='w-full sm:flex-1 outline-none' 
          type='email' 
          placeholder='Enter your email' 
        />
        
        {/* Submit Button */}
        <button 
          type='submit' 
          className='bg-black text-white text-xs px-10 py-4 uppercase'
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;