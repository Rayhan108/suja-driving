import { Input, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TheoryManagementTopicTable from "../../component/TheoryManagement/TheoryManagementTopicTable";
import AddTopicForm from "../../component/TheoryManagement/AddTopicForm";
import AddAdiTopicForm from "../../component/AdiTheoryManagement/AddAdiTopicForm";
import AdiTheoryManagementTopicTable from "../../component/AdiTheoryManagement/AdiTheoryManagementTopicTable";

const AdiTheoryManagementTopic = () => {
const topic = [
  {
    "id": "01",
    "topicName": "Alertness",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "02",
    "topicName": "Awareness",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "03",
    "topicName": "Concentration",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "04",
    "topicName": "Focus",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "05",
    "topicName": "Memory",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "06",
    "topicName": "Motivation",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "07",
    "topicName": "Problem Solving",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "08",
    "topicName": "Creativity",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "09",
    "topicName": "Decision Making",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "10",
    "topicName": "Time Management",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "11",
    "topicName": "Communication",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "12",
    "topicName": "Leadership",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "13",
    "topicName": "Teamwork",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "14",
    "topicName": "Stress Management",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  },
  {
    "id": "15",
    "topicName": "Adaptability",
    "topicIcon": "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740"
  }
];

  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    // setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };
  const location = useLocation(); // Get the current location (URL)

  // Get the active tab from the URL path (i.e., /category, /topic, /question)
  const activeTabFromURL = location.pathname.split('/')[2]; // Assuming your routes look like "/category", "/topic", "/question"
console.log("activeTabFromURL",activeTabFromURL);
  // Set the initial active tab based on the URL
  const [activeTab, setActiveTab] = useState(activeTabFromURL || 'category');

  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(activeTabFromURL || 'category');
  }, [location]);
    return (
         <div>
      <div className="flex justify-between my-2 font-title mb-8">
        <div className="flex justify-center items-center gap-5">
          <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
          <p className="text-[#3564d3] font-title text-3xl font-bold">
           Adi Theory Management
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
            <button className="bg-[#3F5EAB] text-white p-3 rounded-xl" onClick={() => showModal()}>+Add Topic</button>
          </div>
        </div>
      </div>

      {/* Tabs for Category, Topic, Question */}
      <div className="flex gap-9 mb-8">
        <div>
          <Link to="/adiTheoryManagement/category">
            <button
              className={`${
                activeTab === "category"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } px-8 py-2  rounded-xl`}
            >
              Category
            </button>
          </Link>
        </div>
        <div>
          <Link to="/adiTheoryManagement/topic">
            <button
              className={`${
                activeTab === "topic"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } px-8 py-2  rounded-xl`}
            >
              Topic
            </button>
          </Link>
        </div>
        <div>
          <Link to="/adiTheoryManagement/question">
            <button
              className={`${
                activeTab === "question"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } px-8 py-2  rounded-xl`}
            >
              Question
            </button>
          </Link>
        </div>
      </div>

      {/* Pass category data to the TheoryManagementTable component */}
      <AdiTheoryManagementTopicTable topic={topic} />




            <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
 
      >
  <div>
    <AddAdiTopicForm/>
  </div>
      </Modal>
    </div>
    );
};

export default AdiTheoryManagementTopic;