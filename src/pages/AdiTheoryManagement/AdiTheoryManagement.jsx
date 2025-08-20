import { Input, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import TheoryManagementTable from "../../component/TheoryManagement/TheoryManagementTable";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AddCategoryForm from "../../component/TheoryManagement/AddCategoryForm";
import AddAdiCategoryForm from "../../component/AdiTheoryManagement/AddAdiCategoryForm";
import AdiTheoryManagementTable from "../../component/AdiTheoryManagement/AdiTheoryManagementTable";
import { useGetAllCateroryQuery } from "../../redux/feature/theoryManagement/theoryApi";

const AdiTheoryManagement = () => {
     const [searchTerm, setSearchTerm] = useState(""); 
const type = "ADI"
const {data:allCategory,refetch}=useGetAllCateroryQuery({searchTerm,type})
 
 console.log("all category--->",allCategory);
 const meta = allCategory?.data?.meta;
 const category = allCategory?.data?.result
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
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    // setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };
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
                onChange={handleSearchChange} 
            />
            <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          <div>
            <button className="bg-[#3F5EAB] text-white p-3 rounded-xl" onClick={() => showModal()}>+Add Category</button>
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
          {/* <Link to="/adiTheoryManagement/topic"> */}
            <button
              className={`${
                activeTab === "topic"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } px-8 py-2  rounded-xl`}
            >
              Topic
            </button>
          {/* </Link> */}
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
      <AdiTheoryManagementTable category={category} refetch={refetch} />




               <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
 
      >
  <div>
    <AddAdiCategoryForm refetch={refetch}/>
  </div>
      </Modal>
    </div>
  );
};

export default AdiTheoryManagement;
