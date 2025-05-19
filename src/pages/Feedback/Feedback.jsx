import { SlArrowLeft } from "react-icons/sl";

import FeedbackTable from "../../component/Feedback/FeedbackTable";

const Feedback = () => {
  const feedbackData = [
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    {
      category: "User Performance",
      description: "User Performance Analytics",
      lastUpdate: "02/08/25",
 
    },
    
  ];
  return (
    <div>
      <div className="flex  items-center gap-5 mt-3 mb-12">
        <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
        <p className="text-[#3564d3] font-title text-3xl font-bold">
        Feedback & Support
        </p>
      </div>
      <FeedbackTable feedbackData={feedbackData} />
    </div>
  );
};

export default Feedback;
