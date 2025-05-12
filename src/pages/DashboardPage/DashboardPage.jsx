/* eslint-disable no-unused-vars */
import { FaChevronDown, FaUsers, FaVideo } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import { IoSearch } from "react-icons/io5";

import { Input } from "antd";
import Overview from "../../component/Overview/Overview";
import ClientGrowth from "../../component/ClientGrowth/ClientGrowth";
import TotalEarning from "../../component/TotalEarning/TotalEarning";
import { SlArrowLeft } from "react-icons/sl";

function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 1900;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center pt-0 mt-0 mb-1">
        <div className="flex justify-center items-center gap-5">
          <SlArrowLeft className="w-5 h-5 text-right  text-[#3564d3]" />
          <p className="text-[#3564d3] font-title text-3xl font-bold">
            Dashboard Overview
          </p>
        </div>
        <div>
          <div className="relative w-full sm:w-[300px] ">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3   outline-none w-full rounded-full px-3"
            />
            <span className=" text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center  cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>
      {/* main content */}
      <Overview />
      <ClientGrowth />
      <TotalEarning />
    </div>
  );
}

export default DashboardPage;
