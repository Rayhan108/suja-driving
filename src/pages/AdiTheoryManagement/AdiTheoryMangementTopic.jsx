import { Input, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TheoryManagementTopicTable from "../../component/TheoryManagement/TheoryManagementTopicTable";
import AddTopicForm from "../../component/TheoryManagement/AddTopicForm";
import AddAdiTopicForm from "../../component/AdiTheoryManagement/AddAdiTopicForm";
import AdiTheoryManagementTopicTable from "../../component/AdiTheoryManagement/AdiTheoryManagementTopicTable";
import {
  useGetAllCateroryQuery,
  useGetAllTopicQuery,
} from "../../redux/feature/theoryManagement/theoryApi";

const AdiTheoryManagementTopic = () => {
    const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
const type = "ADI"
const {data:allCategory}=useGetAllCateroryQuery({searchTerm,type})
  const { data: allTopic, refetch } = useGetAllTopicQuery(id);
  const topic = allTopic?.data?.result;

  console.log("all category--->", allCategory);
  console.log("all topic--->", topic);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const category = allCategory?.data?.result;
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
  const activeTabFromURL = location.pathname.split("/")[2]; // Assuming your routes look like "/category", "/topic", "/question"
  console.log("activeTabFromURL", activeTabFromURL);
  // Set the initial active tab based on the URL
  const [activeTab, setActiveTab] = useState(activeTabFromURL || "category");

  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(activeTabFromURL || "category");
  }, [location]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update the searchTerm state
  };
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
              onChange={handleSearchChange} // Handle input change
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
              +Add Topic
            </button>
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
      <AdiTheoryManagementTopicTable topic={topic} refetch={refetch} />

      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div>
          <AddAdiTopicForm category={category} refetch={refetch} />
        </div>
      </Modal>
    </div>
  );
};

export default AdiTheoryManagementTopic;
