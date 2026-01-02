import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, NavLink } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, lastPrice}) => {
  
  const { currency } = useContext(ShopContext); // Assuming currency is pulled from context

  return (
    // Link component wraps the whole product item and links to the detail page
    <NavLink className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      
      {/* Image container with hover effect */}
      <div className='overflow-hidden'>
        <img 
          className='hover:scale-110 transition ease-in-out img-product' 
          src={image[0]} 
          alt={name} 
          
        />
      </div>

      {/* Product Name */}
      <p className='pt-2 pb-2 text-md'>{name}</p>
  

      {/* Price with Currency */}
      <p className='text-sm font-medium'>
        {currency}{price} {lastPrice}
      </p>

    </NavLink>
  );
};

export default ProductItem;