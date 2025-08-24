/* eslint-disable no-unused-vars */

import { useState } from "react";
import dayjs from "dayjs";
import { IoSearch } from "react-icons/io5";

import { Input } from "antd";
import Overview from "../../component/Overview/Overview";
import { SlArrowLeft } from "react-icons/sl";
import RecentActivity from "../../component/RecentActivity/RecentActivity";
import PracticeSession from "../../component/practiceSession/practiceSession";
import Question from "../../component/RecentActivity/Question";

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
    <div className=" container mx-auto font-title mb-5">
      <div className="flex justify-between my-2">
        <div className="flex  justify-center items-center gap-5 mb-5">
          <SlArrowLeft className="w-5 h-5 text-right  text-[#3564d3]" />
          <p className="text-[#3564d3] font-title text-3xl font-bold">
            Dashboard Overview
          </p>
        </div>

      </div>
      <div className="flex flex-col justify-between items-center pt-0 mt-0 mb-1"></div>
      {/* main content */}
      <Overview />
      <PracticeSession />
      <div className="flex gap-10 w-[100%]">
        {/* <RecentActivity /> */}

        {/* <Question /> */}
      </div>
    </div>
  );
}

export default DashboardPage;
