import { Input, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import TheoryManagementTable from "../../component/TheoryManagement/TheoryManagementTable";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AddCategoryForm from "../../component/TheoryManagement/AddCategoryForm";
import AddAdiCategoryForm from "../../component/AdiTheoryManagement/AddAdiCategoryForm";
import AdiTheoryManagementTable from "../../component/AdiTheoryManagement/AdiTheoryManagementTable";
import HighTable from "../../component/Highway/HighTable";
import HighwayAdd from "../../component/Highway/HighwayAdd";

const HighwayPage = () => {
  const category = [
    {
      sl: "01",
      topicsName: "Bus",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
        description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "02",
      topicsName: "Car",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "03",
      topicsName: "Bike",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "01",
      topicsName: "Bus",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "02",
      topicsName: "Car",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "03",
      topicsName: "Bike",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "01",
      topicsName: "Bus",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "02",
      topicsName: "Car",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "03",
      topicsName: "Bike",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "01",
      topicsName: "Bus",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "02",
      topicsName: "Car",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
    {
      sl: "03",
      topicsName: "Bike",
      images:
        "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740",
            description:"A road curve to the left means the road ahead bends to the left. Drivers should anticipate the turn and reduce speed accordingly, especially if the curve is sharp or the road is wet. Look ahead to see the curve and maintain a smooth steering line. "
    },
  
  ];

  const location = useLocation(); // Get the current location (URL)

  // Get the active tab from the URL path (i.e., /category, /topic, /question)
  const activeTabFromURL = location.pathname.split("/")[2]; // Assuming your routes look like "/category", "/topic", "/question"
  console.log("activeTabFromURL", activeTabFromURL);
  // Set the initial active tab based on the URL
  const [activeTab, setActiveTab] = useState(activeTabFromURL || "category");

  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(activeTabFromURL || "category");
  }, [location]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    // setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between my-2 font-title">
        <div className="flex justify-center items-center gap-5">
          <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
          <p className="text-[#3564d3] font-title text-3xl font-bold">
            Dashboard Overview
          </p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full sm:w-[300px] ">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3 outline-none w-full rounded-full px-3"
            />
            <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          <div>
            <button
              className="bg-[#3F5EAB] text-white p-3 rounded-xl"
              onClick={() => showModal()}
            >
              +Add Code
            </button>
          </div>
        </div>
      </div>

      {/* Pass category data to the TheoryManagementTable component */}
      <HighTable category={category} />

      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div>
          <h1 className="text-3xl text-center text-[#333333]">Add Code</h1>
          <HighwayAdd />
        </div>
      </Modal>
    </div>
  );
};

export default HighwayPage;
