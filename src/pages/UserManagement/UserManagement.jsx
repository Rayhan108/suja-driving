import { Input } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import UserTable from "../../component/UserManagement/UserTable";

const UserManagement = () => {
      const [activeTab, setActiveTab] = useState("allOrder");
        const [searchTerm, setSearchTerm] = useState(""); 
        
          const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update the searchTerm state
  };





    return (
        <div className="title">
        <div className="flex justify-between mb-12 mt-5"> 
      <div className="flex  justify-center items-center gap-5">
 
          <p className="text-[#3564d3] font-title text-3xl font-bold">
            User Management
          </p>
        </div>
        <div>
          <div className="relative w-full sm:w-[300px] ">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3   outline-none w-full rounded-full px-3"
                onChange={handleSearchChange} // Handle input change
            />
            <span className=" text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center  cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
        </div>

    {/* Table with filtered data */}
    <UserTable searchTerm={searchTerm}/>
  </div>
    );
};

export default UserManagement;