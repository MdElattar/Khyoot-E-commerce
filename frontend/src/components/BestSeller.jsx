import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Product from '../pages/Product';
import ProductItem from './ProductItem';

const BestSeller = () => {
    // 1. Get products from global context
    const { products } = useContext(ShopContext);
    
    // 2. State to hold the filtered best seller products
    const [bestSeller, setBestSeller] = useState([]);

    // 3. Effect to filter products when the component mounts or 'products' changes
    useEffect(() => {
        // Filter products where the 'bestseller' property is true
        const bestProduct = products.filter((item) => item.bestseller);
        
        // Slice the array to show only the first 5 best sellers
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]); // Dependency array ensures this runs when products are loaded

    return (
        <div className='my-5'>
            <div className='text-center  py-5'>
                {/* Title Component receives text1 and text2 props */}
                 <h2 className="section-title ">
                Winter Collection
                <div className="title-underline"></div>
            </h2>
           
            </div>
            
            
            {/* 4. Rendering the Best Seller Products (Implementation missing in image, 
                   but this is where you would map over the 'bestSeller' state)
            */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-0' >
                {
                  bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image}  price={item.price} />
                  ))
                }
            </div>
            {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8'>
                {bestSeller.map(product => (
                    <ProductItem key={product.id} {...product} />
                ))}
            </div> 
            */}
        </div>
    );
};

export default BestSeller;