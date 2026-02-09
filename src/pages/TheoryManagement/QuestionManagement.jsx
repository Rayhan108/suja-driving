import { Input, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QuestionTable from "../../component/TheoryManagement/QuestionTable";
import AddQuesForm from "../../component/TheoryManagement/AddQuesForm";
import { useGetAllQuesQuery } from "../../redux/feature/theoryManagement/theoryApi";



const QuestionManagement = () => {
  const {id} =useParams() 
    const [searchTerm, setSearchTerm] = useState("");
      const [page, setPage] = useState(1);
  const {data:getAllQues,refetch}=useGetAllQuesQuery({id,page,searchTerm})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const question =getAllQues?.data?.result;
const meta = getAllQues?.data?.meta
// console.log("get all ques-->",getAllQues);
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
// console.log("activeTabFromURL",activeTabFromURL);
  // Set the initial active tab based on the URL
  const [activeTab, setActiveTab] = useState(activeTabFromURL || 'category');

  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(activeTabFromURL || 'category');
  }, [location]);
    // ---- pass this to the table ----
  const handlePageChange = (nextPage /*, pageSize */) => {
    // console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update the searchTerm state
  };
    return (
       <div>
      <div className="flex justify-between mt-2 mb-8 font-title">
        <div className="flex justify-center items-center gap-5">
             <Link to={'/theoryManagement'}>
          <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
          </Link>
          <p className="text-[#3564d3] font-title text-3xl font-bold">
          Theory Management
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
            <button className="bg-[#3F5EAB] text-white p-3 rounded-xl"  onClick={() => showModal()}>+Add Question</button>
          </div>
        </div>
      </div>

      {/* Tabs for Category, Topic, Question */}
      <div className="flex gap-9 mb-8 font-title">
        {/* <div>
          <Link to="/theoryManagement/category">
            <button
              className={`${
                activeTab === "category"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              }  px-8 py-2 rounded-xl`}
            >
              Category
            </button>
          </Link>
        </div> */}
        <div>
       <Link to="/theoryManagement/topic">
            <button
              className={`${
                activeTab === "topic"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              }  px-8 py-2 rounded-xl`}
            >
              Topic
            </button>
      </Link>
        </div>
        <div>
      
            <button
              className={`${
                activeTab === "question"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              }  px-8 py-2 rounded-xl`}
            >
              Question
            </button>
          
        </div>
      </div>

      {/* Pass category data to the TheoryManagementTable component */}
      <QuestionTable question={question} refetch={refetch} meta={meta} page={page} handlePageChange={handlePageChange}/>



      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
 
      >
  <div>
    <AddQuesForm refetch={refetch} setIsModalOpen={setIsModalOpen}/>
  </div>
      </Modal>

    </div>
    );
};

export default QuestionManagement;