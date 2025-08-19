import { Input } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import UserTable from "../../component/UserManagement/UserTable";
import { SlArrowLeft } from "react-icons/sl";
const UserManagement = () => {
      const [activeTab, setActiveTab] = useState("allOrder");
        const [searchTerm, setSearchTerm] = useState(""); 
          const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update the searchTerm state
  };
  const user = [
  {
    userId: "U12345",
    name: "John Doe",
    email: "john.doe@example.com",
    "test-type": "Standard",
    status: "Active",
  },
  {
    userId: "U67890",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    "test-type": "Premium",
    status: "Deactive",
  },
  {
    userId: "U11223",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    "test-type": "Advanced",
    status: "Active",
  },
  {
    userId: "U44556",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    "test-type": "Standard",
    status: "Deactive",
  },
  {
    userId: "U78901",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    "test-type": "Standard",
    status: "Active",
  },
  {
    userId: "U22334",
    name: "Emily Evans",
    email: "emily.evans@example.com",
    "test-type": "Premium",
    status: "Active",
  },
  {
    userId: "U33445",
    name: "David Wilson",
    email: "david.wilson@example.com",
    "test-type": "Basic",
    status: "Deactive",
  },
  {
    userId: "U55678",
    name: "Grace Lee",
    email: "grace.lee@example.com",
    "test-type": "Standard",
    status: "Active",
  },
  {
    userId: "U66789",
    name: "Henry Clark",
    email: "henry.clark@example.com",
    "test-type": "Advanced",
    status: "Deactive",
  },
  {
    userId: "U77890",
    name: "Isabella Martin",
    email: "isabella.martin@example.com",
    "test-type": "Premium",
    status: "Active",
  },
  {
    userId: "U99101",
    name: "Jack Walker",
    email: "jack.walker@example.com",
    "test-type": "Standard",
    status: "Active",
  },
  {
    userId: "U11234",
    name: "Liam Lewis",
    email: "liam.lewis@example.com",
    "test-type": "Advanced",
    status: "Deactive",
  },
  {
    userId: "U22345",
    name: "Megan Carter",
    email: "megan.carter@example.com",
    "test-type": "Premium",
    status: "Active",
  },
  {
    userId: "U33456",
    name: "Nathan Harris",
    email: "nathan.harris@example.com",
    "test-type": "Basic",
    status: "Deactive",
  },
  {
    userId: "U44567",
    name: "Olivia Scott",
    email: "olivia.scott@example.com",
    "test-type": "Standard",
    status: "Active",
  },
];




    return (
        <div className="title">
        <div className="flex justify-between mb-12 mt-5"> 
      <div className="flex  justify-center items-center gap-5">
          <SlArrowLeft className="w-5 h-5 text-right  text-[#3564d3]" />
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