import { SlArrowLeft } from "react-icons/sl";

import FeedbackTable from "../../component/Feedback/FeedbackTable";
import { useGetAllFeedbackQuery } from "../../redux/feature/feedback/feedbackApi";
import { useState } from "react";

const Feedback = () => {
  const [page,setPage]=useState(1)
  const {data:allFeedback}=useGetAllFeedbackQuery(page)
  // console.log("all feedback------>",allFeedback);

  const feedbackData = allFeedback?.data?.result 
  const meta = allFeedback?.data?.meta
    const handlePageChange = (nextPage /*, pageSize */) => {
    // console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
  return (
    <div>
      <div className="flex  items-center gap-5 mt-3 mb-12">
      
        <p className="text-[#3564d3] font-title text-3xl font-bold">
        Feedback & Support
        </p>
      </div>
      <FeedbackTable feedbackData={feedbackData} handlePageChange={handlePageChange} meta={meta} page={page}/>
    </div>
  );
};

export default Feedback;
