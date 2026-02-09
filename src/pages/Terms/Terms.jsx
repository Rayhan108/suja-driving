import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useAddTermsPolicyMutation, useGetTermsQuery } from "../../redux/feature/others/othersApi";
import { message } from "antd";

function TermsCondition() {
    const { data: terms, refetch } = useGetTermsQuery(undefined);
    const termsData = terms?.data?.description;
    // console.log("terms data from backend-->", termsData);
  const [content, setContent] = useState("");
  const [addTerms]=useAddTermsPolicyMutation()
    // Load saved content from localStorage when the page loads
    useEffect(() => {
      const savedContent = localStorage.getItem("termsAndConditionsContent");
      if (savedContent) {
        setContent(savedContent);
      } 
      // else {
       
      //   setContent("");
      // }
    }, []);
  
    // Save content to localStorage whenever it changes
    const handleSave = async() => {
      localStorage.setItem("termsAndConditionsContent", content);
        const privacyContent = {
      description: content,
    };
    // console.log("privacy content->", privacyContent);
    // message.success("Privacy Policy Saved Successfully!");
    try {
      const res = await addTerms(privacyContent).unwrap();
      // console.log("privacy content response ---->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.error);
      }
    } catch (error) {
      message.error(res?.data?.error);
    }
    };
  
    return (
      <div className="p-5 text-black font-title bg-white">
      <div className="flex  items-center gap-5 my-3">
                                  <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
                                  <p className="text-[#3564d3] font-title text-3xl font-bold">
                         Terms & Conditions
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

export default TermsCondition;
