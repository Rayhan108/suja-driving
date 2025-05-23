import { Input, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AddCategoryForm from "../../component/TheoryManagement/AddCategoryForm";
import HazardTable from "../../component/Hazard/HazardTable";

const HazardPage = () => {
  const hazardData = [
    {
      sl: "01",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "02",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "03",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "04",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "05",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "06",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "07",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "07",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "07",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      sl: "07",
      topicName: "Demo",
      vedio: "https://www.w3schools.com/html/mov_bbb.mp4",
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
      <div className="flex justify-between my-2 mb-12 font-title">
        <div className="flex justify-center items-center gap-5">
          <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
          <p className="text-[#3564d3] font-title text-3xl font-bold">
            Hazard Perception
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
              +Add Vedio
            </button>
          </div>
        </div>
      </div>

      {/* Pass category data to the TheoryManagementTable component */}
      <HazardTable hazardData={hazardData} />

      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div>
          <AddCategoryForm />
        </div>
      </Modal>
    </div>
  );
};

export default HazardPage;
