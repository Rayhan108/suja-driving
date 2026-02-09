// import React from "react";
// import { useForm } from "react-hook-form";
// import { useCreateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
// import { useParams } from "react-router-dom";
// import { message } from "antd";

// const AddQuesForm = ({refetch,setIsModalOpen}) => {
//   const [createQues]=useCreateQuesMutation()
//   const {id} = useParams();
//   console.log("id------->",id);
//   const topicId = id
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     const modifiedData={
//       topic:topicId,
//       ...data
//     }
//     console.log("Form Data:", modifiedData);
//      try {
//       const res = await createQues({args:modifiedData,
//       id:id,}).unwrap();
//       console.log("response--->", res);
//       if (res?.success) {
//         message.success(res?.message);
//         refetch();
//         reset();
//         setIsModalOpen(false)
//       } else {
//         message.error(res?.message);
//       }
//     } catch (error) {
//       message.error(error?.data?.message);
//     }
//     reset();
//   };

//   const onCancel = () => {
//     reset();
//     setIsModalOpen(false)
//   };

//   return (
//   <form
//   onSubmit={handleSubmit(onSubmit)}
//   className="max-w-md mx-auto p-6 space-y-6 font-title"
//   noValidate
// >
//   <div className="flex justify-between space-x-4">


  
//   </div>

//   <div>
//     <label className="block mb-1 font-medium text-gray-700">Question</label>
//     <input
//       {...register("question", { required: true })}
//       placeholder="Write Here"
//       className="w-full border border-gray-300 rounded-md px-3 py-2"
//     />
//     {errors.question && (
//       <p className="text-red-500 text-sm mt-1">Question is required</p>
//     )}
//   </div>

//   {/* Options for answers */}
//   <div>
//     <label className="block mb-1 font-medium text-gray-700">Answers</label>
//     <input
//       {...register("options[0]", { required: true })}
//       placeholder="Option 1"
//       className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
//     />
//     {errors.options?.[0] && (
//       <p className="text-red-500 text-sm mt-1">Option 1 is required</p>
//     )}

//     <input
//       {...register("options[1]", { required: true })}
//       placeholder="Option 2"
//       className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
//     />
//     {errors.options?.[1] && (
//       <p className="text-red-500 text-sm mt-1">Option 2 is required</p>
//     )}

//     <input
//       {...register("options[2]", { required: true })}
//       placeholder="Option 3"
//       className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
//     />
//     {errors.options?.[2] && (
//       <p className="text-red-500 text-sm mt-1">Option 3 is required</p>
//     )}

//     <input
//       {...register("options[3]", { required: true })}
//       placeholder="Option 4"
//       className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
//     />
//     {errors.options?.[3] && (
//       <p className="text-red-500 text-sm mt-1">Option 4 is required</p>
//     )}
//   </div>

//   {/* Correct Answer */}
//   <div>
//     <label className="block mb-1 font-medium text-gray-700">Correct Answer</label>
//     <input
//       {...register("answer", { required: true })}
//       placeholder="Correct Answer"
//       className="w-full border border-gray-300 rounded-md px-3 py-2"
//     />
//     {errors.answer && (
//       <p className="text-red-500 text-sm mt-1">Answer is required</p>
//     )}
//   </div>

//   {/* Explanation */}
//   <div>
//     <label className="block mb-1 font-medium text-gray-700">Explanation</label>
//     <textarea
//       {...register("explanation", { required: true })}
//       placeholder="Write Here"
//       rows={4}
//       className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
//     />
//     {errors.explanation && (
//       <p className="text-red-500 text-sm mt-1">Explanation is required</p>
//     )}
//   </div>

//   <div className="flex gap-12  mt-6">
//     {/* <button
//       type="button"
//       onClick={onCancel}
//       className="w-full px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 "
//     >
//       Cancel
//     </button> */}
//     <button
//       type="submit"
//       className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//     >
//       Add
//     </button>
//   </div>
// </form>
//   );
// };

// export default AddQuesForm;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; 

const AddQuesForm = ({ refetch, setIsModalOpen }) => {
  const [createQues] = useCreateQuesMutation();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("question_image", file);রা
    }
  };


  const removeImage = () => {
    setImagePreview(null);
    setValue("question_image", null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

 
      if (data.question_image) {
        formData.append("question_image", data.question_image);
      }

   
      const questionData = {
        topic: id,
        question: data.question,
        options: data.options,
        answer: data.answer,
        explanation: data.explanation,
      };

      formData.append("data", JSON.stringify(questionData));

      const res = await createQues({
        args: formData,
        id: id,
      }).unwrap();

      if (res?.success) {
        message.success(res?.message || "Question created successfully");
        refetch();
        reset();
        setImagePreview(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 space-y-5 font-title bg-white rounded-lg"
    >
      {/* --- Image Upload Section --- */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700 text-sm">Question Image (Optional)</label>
        
        {!imagePreview ? (
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-blue-50 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
                <FaCloudUploadAlt size={28} />
              </div>
              <p className="text-sm text-gray-600">
                <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG or WEBP (Max 2MB)</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-contain" 
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </div>
        )}
      </div>

      {/* --- Question Input --- */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Question</label>
        <input
          {...register("question", { required: "Question is required" })}
          placeholder="Type your question here..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
        />
        {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question.message}</p>}
      </div>

      {/* --- Options --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <label className="block mb-1 font-medium text-gray-600 text-xs uppercase tracking-wider">Option {index + 1}</label>
            <input
              {...register(`options.${index}`, { required: true })}
              placeholder={`Option ${index + 1}`}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        ))}
      </div>

      {/* --- Correct Answer & Explanation --- */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Correct Answer</label>
          <input
            {...register("answer", { required: "Answer is required" })}
            placeholder="Specify the correct answer"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Explanation</label>
          <textarea
            {...register("explanation", { required: "Explanation is required" })}
            placeholder="Why is this answer correct?"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* --- Submit Button --- */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Create Question
        </button>
      </div>
    </form>
  );
};

export default AddQuesForm;