import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  
  const { getCartCount, token, setToken, setCartItems, navigate } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  return (
    <header
      className="header flex items-center justify-between py-5 font-medium  top-0 left-0 w-full bg-[#003459]    shadow-lg z-40 transition-all
   duration-300  border-blue-950 absolute "
    >
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-wrap justify-between items-center">
          <img
            onClick={() => setVisible(true)}
            src={assets.menu}
            className="w-8 drop-menu cursor-pointer lg:hidden "
            alt=""
          />
          <NavLink
            to="/"
            className=" khyoot text-4xl font-bold text-white  items-center space-x-2 flex"
          >
            KHYOOT
          </NavLink>

          <nav className="nav flex justify-between items-center px-4 md:px-10 lg:px-20 py-4 gap-5 text-white  ">
            <ul className="hidden lg:flex  gap-8 text-lg font-medium">
              <NavLink
                to="/"
                className=" text-2xl transition duration-300 ease-in-out flex flex-col
       items-center gap-1 "
                style={{ fontFamily: "sans-serif" }}
              >
                <p className="">HOME</p>
                <hr className="w-2/4 border-none h-[1.7px] bg-black hidden" />
              </NavLink>
              <NavLink
                to="/collection"
                className=" text-2xl transition duration-300 ease-in-out flex flex-col
        items-center gap-1  "
                style={{ fontFamily: "sans-serif" }}
              >
                <p className="text-white">COLLECTION</p>
                <hr className="w-2/4 border-none h-[1.7px] bg-black hidden" />
              </NavLink>
              <NavLink
                to="/about"
                className="text-white text-2xl transition duration-300 ease-in-out flex flex-col
        items-center gap-1 "
                style={{ fontFamily: "sans-serif" }}
              >
                <p className="text-white">ABOUT</p>
                <hr className="w-2/4 border-none h-[1.7px] bg-black hidden" />
              </NavLink>
              <NavLink
                to="/contactus"
                className="text-white text-2xl transition duration-300 ease-in-out flex flex-col
        items-center gap-1 "
                style={{ fontFamily: "sans-serif" }}
              >
                <p className="text-white">CONTACTUS</p>
                <hr className="w-2/4 border-none h-[1.7px] bg-black hidden" />
              </NavLink>
            </ul>
          </nav>
          <div className="icons flex items-center gap-6 text-2xl ">
            {/* <img src="src/assets/frontend_assets/search.png" className='w-8  cursor-pointer ' alt="" /> */}

            <div className="group relative">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                src={assets.user}
                className="w-8  cursor-pointer "
                alt=""
              />
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-black rounded">
                    <p className="cursor-pointer text-lg hover:font-bold">
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer text-lg hover:font-black"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer text-lg hover:font-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            <Link to="/cart" className="relative">
              <img src={assets.bag} className="w-8 " alt="" />
              <p className="absolute right-[-8px] bottom-[-9px] w-5 text-center leading-5 bg-white text-black aspect-square rounded-full text-[12px] font-bold">
                {getCartCount()}
              </p>
            </Link>
          </div>
          {/* sidebar menu for all small screens   */}
          <div
            className={`
    fixed top-0 left-0
    h-[300vh] w-screen
    bg-[#003459] text-white
    z-50
    transition-transform duration-300 ease-in-out
    overflow-y-auto
    ${visible ? "translate-x-0" : "-translate-x-full"}
  `}
          >
            {/* 1. Close Button (Absolute positioned 'X' icon) */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setVisible(false)} // Assuming your state setter is setVisible
                className="text-4xl text-white hover:text-gray-400 transition-colors"
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>

            {/* 2. Brand/Logo (Optional - for prominence) */}
            <div className="text-center py-6 border-b ">
              <h3 className="text-4xl text-white font-extrabold tracking-wider">
                KHYOOT
              </h3>
            </div>

            {/* 3. Navigation Links Container */}
            <div className="flex flex-col pt-4">
              {/* Links are mapped, or listed like this: */}
              <NavLink
                onClick={() => setVisible(false)}
                to="/"
                className="py-4 px-6 x text-xl font-medium tracking-wider border-b text-white hover:bg-black hover:text-white transition-colors"
              >
                HOME
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                to="/collection"
                className="py-4 px-6 text-xl font-medium tracking-wider border-b text-white hover:bg-black hover:text-white transition-colors"
              >
                COLLECTION
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                to="/about"
                className="py-4 px-6 text-xl font-medium tracking-wider border-b  text-white hover:bg-black hover:text-white transition-colors"
              >
                ABOUT
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                to="/contactus"
                className="py-4 px-6 text-xl font-medium tracking-wider border-b text-white hover:bg-black hover:text-white transition-colors"
              >
                CONTACT US
              </NavLink>
            </div>

            {/* The rest of the content or the KHYOOT logo at the bottom */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
