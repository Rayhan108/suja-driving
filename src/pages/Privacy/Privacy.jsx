import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

function PrivacyPolicy() {
    const [content, setContent] = useState("");

    // Load saved content from localStorage when the page loads
    useEffect(() => {
      const savedContent = localStorage.getItem("privacyPolicyContent");
      if (savedContent) {
        setContent(savedContent);
      } else {
        // default content if nothing is saved
        setContent(`
          <h2>1. Introduction</h2>
          <ul>
            <li>Explain that the app values user privacy and is committed to protecting personal information.</li>
            <li>Mention the types of data collected (e.g., personal information, transaction data, usage data).</li>
          </ul>
  
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Personal Information: Names, email addresses, phone numbers, etc.</li>
            <li>Payment Information: Credit/debit card details (if applicable).</li>
            <li>Usage Data: How users interact with the app, device details, IP addresses.</li>
            <li>Cookies and Tracking Technologies: Information about the cookies or other tracking methods used.</li>
          </ul>
        `);
      }
    }, []);
  
    // Save content to localStorage whenever it changes
    const handleSave = () => {
      localStorage.setItem("privacyPolicyContent", content);
      toast.success("Privacy Policy Saved Successfully!");
    };
  
    return (
      <div className="p-5 text-black font-title bg-white">
         <div className="flex  items-center gap-5 my-3">
                                      <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
                                      <p className="text-[#3564d3] font-title text-3xl font-bold">
                            Privacy Policy
                                      </p>
                                    </div>
  
        <div className=" rounded shadow p-5 h-full">
          <ReactQuill
            style={{ padding: "10px" }}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
  
        <div className="text-center py-5 ">
          <button
            onClick={handleSave}
            className="bg-[#3564d3] text-white font-semibold px-2 py-2 rounded transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
}

export default PrivacyPolicy;
