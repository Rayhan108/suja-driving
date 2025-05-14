import { Link, useLocation } from "react-router-dom";
import { FaHome, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import {
  IoBagAddOutline,
  IoCloseSharp,
  IoLogInOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { GoQuestion } from "react-icons/go";
 
import { LuSquareMenu } from "react-icons/lu";
import { useState } from "react"; // Import useState
import logo from "../../assets/Logo.png"
import { RiDashboard3Line, RiLogoutCircleLine } from "react-icons/ri";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Track the dropdown state
const user = false;
  // Check if current path matches a menu item
  const isActive = (path) => currentPath === path;

  // Check if any settings submenu is active
  const isSettingsActive = currentPath.startsWith("/setting");

  // Handle toggling of the settings dropdown
  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div
      className={`fixed lg:static px-3 bg-[#3F5EAB] text-[#0D0D0D] w-[70%] sm:w-[70%] md:w-[15%] lg:w-[15%]  overflow-y-auto py-5 md:py-0 z-50 transition-transform ${
        isOpen ? "translate-x-0 top-0 left-0 " : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-white bg-[#0D0D0D] focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp />
      </button>
  <div>
    
  </div>
      {/* Sidebar Menu */}
        <div className="flex justify-center items-center mt-0">
        <img src={logo} className="w-16 mb-3 mt-3 "/>
        </div>
      <ul className="-mt-2 pl-5 text-[10px]">
        {/* Dashboard Page */}
        
        <Link to="/" className="flex justify-between ">
             {isActive("/") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%]  ${
              isActive("/") ? "bg-[#F3F3F3] text-[#2f5fcf]  px-3 py-3 rounded-xl" : ""
            }`}
          >
            <FaHome className="w-5 h-5" />
            <p className="text-lg font-semibold">Dashboard</p>
          </li>
        </Link>

        {/* User Page */}
        <Link to="/userManagement" className="flex justify-between ">
              {isActive("/g") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/userManagement") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg font-semibold">User Management</p>
          </li>
        </Link>
        
        {/* Vendor */}
        <Link to="/vendor" className="flex justify-between ">
              {isActive("/vendor") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/vendor") ? "bg-[#F3F3F3] text-[#3564d3]  px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg font-semibold">Theory Management</p>
          </li>
        </Link>

        {/* Order */}
        <Link to="/order" className="flex justify-between ">
             {isActive("/order") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/order") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">ADI Theory Management</p>
          </li>
        </Link>
        {/* Hazard */}
        <Link to="/hazard" className="flex justify-between ">
                {isActive("/hazard") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/hazard") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">ADI Theory Management</p>
          </li>
        </Link>
        {/* Highway */}
        <Link to="/highway" className="flex justify-between ">
            {isActive("/highway") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/highway") ? "bg-[#F3F3F3] text-[#3564d3]  px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" /> 
            <p className="text-lg font-semibold">Highway Code</p>
          </li>
        </Link>
        {/* Test */}
        <Link to="/test" className="flex justify-between ">
              {isActive("/test") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/test") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">Test & Scoring Settings</p>
          </li>
        </Link>
        {/* Subscription */}
        <Link to="/subscription" className="flex justify-between ">
           {isActive("/subscription") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/services") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">Subscriptions & Payment</p>
          </li>
        </Link>
        {/* feedback */}
        <Link to="/feedback" className="flex justify-between ">
               {isActive("/feedback") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/feedback") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">Feedback & Support</p>
          </li>
        </Link>
        {/* Analysis */}
        <Link to="/analysis" className="flex justify-between ">
               {isActive("/analysis") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out text-white w-[98%] ${
              isActive("/analysis") ? "bg-[#F3F3F3] text-[#3564d3] px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">Analytics & Reports</p>
          </li>
        </Link>


        {/* Settings */}
        <button
          onClick={toggleSettingsDropdown} // Toggle the dropdown
          className={`flex justify-between items-center gap-2 mt-3 cursor-pointer py-2 whitespace-nowrap transition-all duration-300 ease-in-out ${
            isSettingsActive ? "bg-[#F3F3F3] text-[#3564d3] pl-3 pr-5 py-3 rounded-2xl" : ""
          }`}
        >
                {isActive("/setting") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          ) }
          <div className="flex flex-row justify-between items-center gap-2">
            <IoMdSettings className="w-5 h-5 text-white" />
            <p className="text-lg font-semibold text-white">Settings</p>
          </div>
          <SlArrowDown className="w-5 h-5 text-right ml-5 text-white" />
        </button>

        {/* Settings Submenu */} 
        {isSettingsOpen && (
          <ul className="text-right py-3 ">
            <Link to="/setting/aboutUs">
              <li
                className={`py-[3px] flex items-center gap-2 transition-all duration-300 ease-in-out text-white ${
                  isActive("/setting/aboutUs") ? "text-[#3564d3]" : ""
                }`}
              >
                <IoMdInformationCircleOutline className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Profile</p>
              </li>
            </Link>
            <Link to="/setting/policy">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out text-white ${
                  isActive("/setting/policy") ? "text-[#3564d3]" : ""
                }`}
              >
                <FaRegBookmark className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Terms and Condition</p>
              </li>
            </Link>      
            <Link to="/setting/privacy">
              <li
                className={`py-2 flex items-center gap-2 transition-all duration-300 ease-in-out text-white ${
                  isActive("/setting/privacy") ? "text-[#3564d3]" : ""
                }`}
              >
                <MdOutlinePrivacyTip className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Privacy Policy</p>
              </li>
            </Link>

         

            <Link to="/setting/faq">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out ${
                  isActive("/setting/faq") ? "text-[#00c0b5]" : ""
                }`}
              >
                <GoQuestion className="w-5 h-5 text-lg font-semibold text-white" />
                <p className="text-lg font-semibold text-white">FAQ</p>
              </li>
            </Link>
            <Link to="/setting/support">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out ${
                  isActive("/setting/support") ? "text-[#00c0b5]" : ""
                }`}
              >
                <GoQuestion className="w-5 h-5 text-lg font-semibold text-white" />
                <p className="text-lg font-semibold text-white">Support</p>
              </li>
            </Link>
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-5  w-[90%] px-5">
  {
    user? (
      <Link to="/sign-in">
    <button
      className="flex items-center gap-2 w-full px-0 py-3 border-2 text-white rounded-xl duration-200 justify-center"
    >
    
      <span className="text-lg text-title font-bold">Login</span>
    </button>
  </Link>

    ):(
      <Link to="">
      <button
        className="flex items-center gap-2 w-full px-0 py-3 border-2 text-white rounded-xl duration-200 justify-center"
      >
         <RiLogoutCircleLine  className="w-7 h-7 font-bold text-2xl text-white rotate-90" />
        <span className="text-lg text-title font-bold">Logout</span>
      </button>
    </Link>
    )
  }
</div>

    </div>
  );
};

export default Sidebar;
