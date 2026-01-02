import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const SideBar = () => {
  return (
    <aside className="h-screen bg-white border-r
      w-[70px] md:w-[240px] transition-all duration-300">
      
      <div className="flex flex-col gap-3 pt-10 px-3 md:px-6 text-[15px] mt-14">

        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `group flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-50 border-l-4 border-blue-600 text-blue-600"
                : "hover:bg-gray-100 text-gray-600"
            }`
          }
        >
          <img
            src={assets.add_icon}
            className="w-5 h-5 mx-auto md:mx-0 group-hover:scale-110 transition"
            alt=""
          />
          <span className="hidden md:block font-medium">
            Add Items
          </span>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `group flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-50 border-l-4 border-blue-600 text-blue-600"
                : "hover:bg-gray-100 text-gray-600"
            }`
          }
        >
          <img
            src={assets.order_icon}
            className="w-5 h-5 mx-auto md:mx-0 group-hover:scale-110 transition"
            alt=""
          />
          <span className="hidden md:block font-medium">
            List Items
          </span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `group flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-50 border-l-4 border-blue-600 text-blue-600"
                : "hover:bg-gray-100 text-gray-600"
            }`
          }
        >
          <img
            src={assets.order_icon}
            className="w-5 h-5 mx-auto md:mx-0 group-hover:scale-110 transition"
            alt=""
          />
          <span className="hidden md:block font-medium">
            Orders
          </span>
        </NavLink>

      </div>
    </aside>
  );
};

export default SideBar;
