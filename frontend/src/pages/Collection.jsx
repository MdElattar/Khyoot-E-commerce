import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    // Retrieves all products from the global context
    const { products } = useContext(ShopContext);
    const [showFilter,setShowFilter] = useState(false);
    const [filterProducts,setFilterProducts] =useState([]);
    const [category,setCategory] = useState([]);
    const [subCategory,setSubCategory] = useState([]);
    const [sortType,setSortType] = useState([]);

    const toggleCategory = (e) => {

      if (category.includes(e.target.value)){
        setCategory(prev => prev.filter(item => item !== e.target.value))
      }
      else{
        setCategory(prev => [...prev,e.target.value])
      }
    }
    
    const toggleSubCategory = (e) => {
      if(subCategory.includes(e.target.value)) {
        setSubCategory(prev => prev.filter(item => item !== e.target.value))
      }
      else {
        setSubCategory(prev => [...prev,e.target.value])
      }
    }

    const applyFilter = () => {

      let productsCopy = products.slice();

      if(category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category));
      }
      if(subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
      }

      setFilterProducts(productsCopy) 

    }

    const sortProduct = () => {

      let fpCopy = filterProducts.slice()

      switch (sortType) {

        case 'low-high':
          setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
          break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;

          default:
            applyFilter();
            break;
          }
    };
    
    useEffect(()=>{
      sortProduct();
    },[sortType])
    
    useEffect(()=>{
      applyFilter();
    },[category,subCategory,products])

    

    return (
        // Main container: Switches from vertical stack on mobile to horizontal row on small screens (sm)
        // Includes top padding and a top border to separate it from the Navbar content
          <div className=' collection flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  mb-5 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >
            {/* Filter Options/Sidebar */}
           <div className='w-60 miin'> 
                {/* Filters Title */}
                <p  className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    {/* An icon would typically go here, e.g., <img src={assets.filter_icon} alt="Filters" /> */}
                    <img onClick={()=>setShowFilter(!showFilter)} className={` imgg h-3 lg:hidden sm:block  ${showFilter ? 'rotate-90' : ''}`}  src="src/assets/frontend_assets/dropdown_icon.png" alt="" />
                </p>
                {/* category filter */}
                  <div className={`hid border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
                      <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700' >
                          <p className='flex gap-2'>
                            <input className='w-3' value={'Men'}   type="checkbox" onChange={toggleCategory}/> Men
                          </p>
                          <p className='flex gap-2'>
                            <input className='w-3' value={'Women'}   type="checkbox" onChange={toggleCategory}/> Women
                          </p>
                          <p className='flex gap-2'>
                            <input className='w-3' value={'Unisex'}   type="checkbox" onChange={toggleCategory}/> Unisex
                          </p>
                          
                      </div>
                    </div>
                    {/* The rest of the filter categories would be listed here */}
                    {/* subCategory */}
                    <div className={` hid border border-gray-300 pl-5 py-3 mt-6  my-5  ${showFilter ? '' : 'hidden'}`}>
                      <p className='mb-3 text-sm font-medium'>TYPE</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700' >
                          <p className='flex gap-2'>
                            <input className='w-3' value={'Hoddies'}  type="checkbox" onChange={toggleSubCategory} /> Hoddies
                          </p>
                          <p className='flex gap-2'>
                            <input className='w-3' value={'TShirts'}  type="checkbox" onChange={toggleSubCategory} /> T-Shirts
                          </p>
                          <p className='flex gap-2'>
                            <input className='w-3' value={'Babytees'}  type="checkbox" onChange={toggleSubCategory} /> BabyTees
                          </p>
                          <p className='flex gap-2'>
                            <input className='w-3' value={'Pants'}  type="checkbox" onChange={toggleSubCategory} /> Pants
                          </p>
                      </div>
                    </div>
                  </div>
                    {/* Right Side */}
                   {/* Product Grid Area (Implicitly follows here, takes up remaining space) */}
                    <div className='flex-1'>
                      <div className='flex justify-between text-base sm:text-2xl mb-4'>
                        <Title  text1={'ALL'} text2={'COLLECTIONS'} />
                        {/* Product Sort */}
                        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' >
                          <option  value="revalent">Sort by: Relavent</option>
                          <option value="low-high">Sort by: Low to High</option>
                          <option value="high-low">Sort by: High to Low</option>
                        </select>
                      </div>

                      {/* Map Product */}
                      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {
                          filterProducts.map((item, index) => (
                            <ProductItem 
                              key={index} 
                              name={item.name} 
                              id={item._id} 
                              price={item.price} 
                              image={item.image} 
                            />
                          ))
                        }
                      </div>
                  </div>
      </div>
    );
};

export default Collection;