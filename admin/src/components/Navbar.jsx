import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <header
      className="header border-b-2 h-20 flex items-center justify-between py-1 font-medium  top-0 left-0 w-full bg-[#003459] shadow-lg z-40 transition-all
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
          <h1
            to="/"
            className="text-4xl font-bold text-white mr-auto items-center space-x-2 "
          >
            KHYOOT
          </h1>

          <div className="icons flex items-center gap-6 text-2xl ">
            <button onClick={() => setToken("")} className="text-white mr-5">
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
