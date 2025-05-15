import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import QuestionTable from "../../component/TheoryManagement/QuestionTable";



const QuestionManagement = () => {
const question = [
  {
    id: "01",
    question: "What should you do when driving in foggy conditions?",
    answere: {
      options: [
        { label: "A", text: "Use fog lights if visibility is seriously reduced" },
        { label: "B", text: "Keep close to the car in front at all times" },
        { label: "C", text: "Flash your headlights to warn other drivers" },
        { label: "D", text: "Do not use your demister and windscreen wipers" }
      ],
      correctOptions: ["A"],  
      explanation: "If visibility is seriously reduced due to fog, you must use dipped headlights."
    }
  },
  {
    id: "02",
    question: "What is the safe following distance under normal conditions?",
    answere: {
      options: [
        { label: "A", text: "1 second" },
        { label: "B", text: "2 seconds" },
        { label: "C", text: "3 seconds" },
        { label: "D", text: "4 seconds" }
      ],
      correctOptions: ["C"],  
      explanation: "A 3-second gap is recommended to maintain a safe following distance."
    }
  },
  {
    id: "03",
    question: "When are you allowed to use a mobile phone while driving?",
    answere: {
      options: [
        { label: "A", text: "Only with a hands-free device" },
        { label: "B", text: "When stopped at a red light" },
        { label: "C", text: "While driving on a quiet road" },
        { label: "D", text: "Never" }
      ],
      correctOptions: ["A"],  
      explanation: "Using a hands-free device is allowed, but holding a phone while driving is prohibited."
    }
  },
  {
    id: "04",
    question: "What should you do at a pedestrian crossing with no traffic lights?",
    answere: {
      options: [
        { label: "A", text: "Stop if pedestrians are waiting to cross" },
        { label: "B", text: "Slow down and sound your horn" },
        { label: "C", text: "Speed up to clear the crossing quickly" },
        { label: "D", text: "Ignore if no pedestrians are on the road" }
      ],
      correctOptions: ["A"],  
      explanation: "You must stop if pedestrians are waiting to cross to allow them to do so safely."
    }
  },
  {
    id: "05",
    question: "How should you react to an emergency vehicle approaching with flashing lights?",
    answere: {
      options: [
        { label: "A", text: "Speed up to get out of the way" },
        { label: "B", text: "Move to the side of the road and stop" },
        { label: "C", text: "Continue driving normally" },
        { label: "D", text: "Ignore and keep going" }
      ],
      correctOptions: ["B"],  
      explanation: "You should move to the side and stop to give way to emergency vehicles."
    }
  }
];


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
      <div className="flex justify-between my-2">
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
            <button className="bg-[#3F5EAB] text-white p-3 rounded-xl">+Add Question</button>
          </div>
        </div>
      </div>

      {/* Tabs for Category, Topic, Question */}
      <div className="flex gap-9 mb-5">
        <div>
          <Link to="/theoryManagement/category">
            <button
              className={`${
                activeTab === "category"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } p-3 rounded-xl`}
            >
              Category
            </button>
          </Link>
        </div>
        <div>
          <Link to="/theoryManagement/topic">
            <button
              className={`${
                activeTab === "topic"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } p-3 rounded-xl`}
            >
              Topic
            </button>
          </Link>
        </div>
        <div>
          <Link to="/theoryManagement/question">
            <button
              className={`${
                activeTab === "question"
                  ? "bg-[#2C4581] text-[#ffffff]"
                  : "bg-[#f1f1f1] text-[#3F5EAB] border-2 border-black"
              } p-3 rounded-xl`}
            >
              Question
            </button>
          </Link>
        </div>
      </div>

      {/* Pass category data to the TheoryManagementTable component */}
      <QuestionTable question={question} />
    </div>
    );
};

export default QuestionManagement;