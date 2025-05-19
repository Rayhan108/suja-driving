import { Link, useLocation } from "react-router-dom";
import { FaCarAlt, FaHome, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import {
  IoArrowRedoCircleSharp,
  IoBagAddOutline,
  IoCloseSharp,
  IoLogInOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineEditRoad, MdOutlinePayment, MdOutlinePrivacyTip } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { GoDeviceCameraVideo, GoQuestion } from "react-icons/go";

import { LuSquareMenu } from "react-icons/lu";
import { useState } from "react"; // Import useState
import logo from "../../assets/Logo.png";
import { RiDashboard3Line, RiFeedbackLine, RiLogoutCircleLine } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { CgMail } from "react-icons/cg";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Track the dropdown state
  const user = false;
  // Check if current path matches a menu item
  const isActive = (path) => currentPath === path;

  // Check if any settings submenu is active
  const isSettingsActive = currentPath.startsWith("/setting");
  console.log("setting active", isSettingsActive);
  // Handle toggling of the settings dropdown
  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Checks if the current URL path starts with the given path
  const isTheory = (path) => location.pathname.startsWith(path);
  const isAdiTheory = (path) => location.pathname.startsWith(path);
  return (
    <div
      className={`fixed lg:static px-3 bg-[#3F5EAB]  w-[70%] sm:w-[70%] md:w-[15%] lg:w-[20%]  overflow-y-auto py-5 md:py-0 z-50 transition-transform font-title ${
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

      {/* Sidebar Menu */}
      <div className="flex justify-center items-center mb-7">
        <img src={logo} className="w-16 mb-3 mt-3 " />
      </div>
      <ul className="-mt-2 pl-5 text-[10px] ">
        {/* Dashboard Page */}

        <Link to="/" className="flex justify-between ">
          {isActive("/") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt- relative"></div>
          )}
          <li
            // text-[#193985]
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out  w-[98%]  ${
              isActive("/")
                ? "bg-[#F3F3F3] text-[#193985]  px-3 py-3 rounded-xl"
                : ""
            }`}
          >
            <FaHome className="w-5 h-5" />
            <p className="text-lg ">Dashboard</p>
          </li>
        </Link>

        {/* User Page */}
        <Link to="/userManagement" className="flex justify-between ">
          {isActive("/userManagement") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14  -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/userManagement")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg">User Management</p>
          </li>
        </Link>

        {/* theory*/}
        <Link to="/theoryManagement" className="flex justify-between ">
          {isTheory("/theoryManagement") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isTheory("/theoryManagement")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <MdOutlineEditRoad  className="w-5 h-5" />
            <p className="text-lg">Theory Management</p>
          </li>
        </Link>

        {/* Order */}
        <Link
          to="/adiTheoryManagement/category"
          className="flex justify-between "
        >
          {isAdiTheory("/adiTheoryManagement") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isAdiTheory("/adiTheoryManagement")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <FaCarAlt  className="w-5 h-5" />
            <p className="text-lg">ADI Theory Management</p>
          </li>
        </Link>
        {/* Hazard */}
        <Link to="/hazard" className="flex justify-between ">
          {isActive("/hazard") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/hazard")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <GoDeviceCameraVideo  className="w-5 h-5" />
            <p className="text-lg">Hazard Perception</p>
          </li>
        </Link>
        {/* Highway */}
        <Link to="/highway" className="flex justify-between ">
          {isActive("/highway") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/highway")
                ? "bg-[#F3F3F3] text-[#193985]  px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <IoArrowRedoCircleSharp  className="w-5 h-5" />
            <p className="text-lg">Highway Code</p>
          </li>
        </Link>
        {/* Test */}
        <Link to="/testScore" className="flex justify-between ">
          {isActive("/testScore") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/testScore")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <MdOutlinePayment className="w-5 h-5" />
            <p className="text-lg">Test & Scoring Settings</p>
          </li>
        </Link>
        {/* Subscription */}
        <Link to="/subscription" className="flex justify-between ">
          {isActive("/subscription") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/subscription")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <CgMail className="w-5 h-5" />
            <p className="text-lg">Subscriptions & Payment</p>
          </li>
        </Link>
        {/* feedback */}
        <Link to="/feedback" className="flex justify-between ">
          {isActive("/feedback") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/feedback")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <RiFeedbackLine className="w-5 h-5" />
            <p className="text-lg">Feedback & Support</p>
          </li>
        </Link>
        {/* Analysis */}
        <Link to="/analytics" className="flex justify-between ">
          {isActive("/analytics") && (
            <div className="bg-[#F3F3F3] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
          )}
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out  w-[98%] ${
              isActive("/analytics")
                ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
                : ""
            }`}
          >
            <SiSimpleanalytics className="w-5 h-5" />
            <p className="text-lg">Analytics & Reports</p>
          </li>
        </Link>

        {/* Settings */}
        <div className="relative mt-3">
          {" "}
          {/* relative container for absolute child */}
          <Link to={"/setting/updateProfile"}>
            <button
              onClick={toggleSettingsDropdown}
              className={`flex w-full justify-between items-center gap-2 mt-1 cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out ${
                isSettingsActive
                  ? "bg-[#F3F3F3] text-[#193985] px-3 pb-2 rounded-2xl"
                  : ""
              } relative`} // position relative here too for any absolute children
            >
              {/* Absolutely positioned colored bar */}
              {isSettingsActive && (
                <div
                  className="bg-[#F3F3F3] w-[3%] -left-6 top-0 absolute h-14"
                  style={{ transform: "translateX(-100%)" }}
                ></div>
              )}

              <li
                className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out w-[98%]`}
              >
                <IoMdSettings className="w-5 h-5 " />
                <p className="text-lg">Settings</p>

          <SlArrowDown
  className={`w-5 h-5 text-right ml-5 hover:-rotate-90 ${
    isSettingsActive
      ? "bg-[#F3F3F3] text-[#193985] px-3 py-3 rounded-2xl"
      : "text-white"
  }`}
/>
              </li>
            </button>
          </Link>
        </div>

        {/* Settings Submenu */}
        {isSettingsOpen && (
          <ul className="text-right ">
            <Link to="/setting/updateProfile">
              <li
                className={` flex items-center gap-2 transition-all duration-300 ease-in-out mb-5 mt-5  ${
                  isActive("/setting/updateProfile")
                    ? "pl-3 pr-5 py-[14px] rounded-2xl bg-[#F3F3F3] text-[#193985]"
                    : ""
                }`}
              >
                <IoMdInformationCircleOutline className="w-5 h-5 text-lg " />
                <p className="text-lg ">Profile</p>
              </li>
            </Link>
            <Link to="/setting/terms">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out mb-1 ${
                  isActive("/setting/terms")
                    ? "pl-3 pr-5 py-[14px] rounded-2xl bg-[#F3F3F3] text-[#193985]"
                    : ""
                }`}
              >
                <FaRegBookmark className="w-5 h-5 text-lg " />
                <p className="text-lg ">Terms and Condition</p>
              </li>
            </Link>
            <Link to="/setting/privacy" className="">
              <li
                className={`py-2 flex items-center gap-2 transition-all duration-300 ease-in-out  ${
                  isActive("/setting/privacy")
                    ? "pl-3 pr-5 py-[14px] rounded-2xl bg-[#F3F3F3] text-[#193985]"
                    : ""
                }`}
              >
                <MdOutlinePrivacyTip className="w-5 h-5 text-lg " />
                <p className="text-lg ">Privacy Policy</p>
              </li>
            </Link>
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-5  w-[90%] px-5">
        {user ? (
          <Link to="/sign-in">
            <button className="flex items-center gap-2 w-full px-0 py-3 border-2 text-white rounded-xl duration-200 justify-center">
              <span className="text-lg text-title font-bold">Login</span>
            </button>
          </Link>
        ) : (
          <Link to="">
            <button className="flex items-center gap-2 w-full px-0 py-3 border-2 text-white rounded-xl duration-200 justify-center">
              <RiLogoutCircleLine className="w-7 h-7 font-bold text-2xl text-white rotate-90" />
              <span className="text-lg text-title font-bold">Logout</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
