
// import { message } from "antd";
// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
// import { useParams } from "react-router-dom";

// const EditAdiQuesForm = ({ refetch, singleData,handleEditCancel }) => {
//   const { id } = useParams();
//   const topicId = id;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,  // to reset the form values
//   } = useForm();

//   const [updateQues] = useUpdateQuesMutation();

//   // Set the default form values when `singleData` is loaded
//   useEffect(() => {
//     if (singleData) {
//       reset({
//         question: singleData.question,
//         options: singleData.options || ["", "", "", ""], // Ensure options are always an array with 4 items
//         answer: singleData.answer,
//         explanation: singleData.explanation,
//       });
//     }
//   }, [singleData, reset]);

//   const onSubmit = async (data) => {
//     console.log("Form Data:", data);
//     const modifiedData = {
//       topic: topicId,
//       ...data,
//     };

//     try {
//       const res = await updateQues({
//         args: modifiedData,
//         id: singleData?._id,
//       }).unwrap();
//       console.log("response--->", res);
//       if (res?.success) {
//         message.success(res?.message);
//         refetch();
//         reset();
//         handleEditCancel()
//       } else {
//         message.error(res?.message);
//       }
//     } catch (error) {
//       message.error(error?.data?.message);
//     }
//   };

//   const onCancel = () => {
//     reset();
//     handleEditCancel()
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-md mx-auto p-6 space-y-6 font-title"
//       noValidate
//     >
//       <div>
//         <label className="block mb-1 font-medium text-gray-700">Question</label>
//         <input
//           {...register("question", { required: true })}
//           placeholder="Write Here"
//           className="w-full border border-gray-300 rounded-md px-3 py-2"
//         />
//         {errors.question && (
//           <p className="text-red-500 text-sm mt-1">Question is required</p>
//         )}
//       </div>

//       {/* Options for answers */}
//       <div>
//         <label className="block mb-1 font-medium text-gray-700">Answers</label>
//         {["options[0]", "options[1]", "options[2]", "options[3]"].map((option, index) => (
//           <div key={option}>
//             <input
//               {...register(option, { required: true })}
//               placeholder={`Option ${index + 1}`}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
//             />
//             {errors.options?.[index] && (
//               <p className="text-red-500 text-sm mt-1">{`Option ${index + 1} is required`}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Correct Answer */}
//       <div>
//         <label className="block mb-1 font-medium text-gray-700">Correct Answer</label>
//         <input
//           {...register("answer", { required: true })}
//           placeholder="Correct Answer"
//           className="w-full border border-gray-300 rounded-md px-3 py-2"
//         />
//         {errors.answer && (
//           <p className="text-red-500 text-sm mt-1">Answer is required</p>
//         )}
//       </div>

//       {/* Explanation */}
//       <div>
//         <label className="block mb-1 font-medium text-gray-700">Explanation</label>
//         <textarea
//           {...register("explanation", { required: true })}
//           placeholder="Write Here"
//           rows={4}
//           className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
//         />
//         {errors.explanation && (
//           <p className="text-red-500 text-sm mt-1">Explanation is required</p>
//         )}
//       </div>

//       <div className="flex gap-12 mt-6">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="w-full px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 "
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Update
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditAdiQuesForm;


import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const EditAdiQuesForm = ({ refetch, singleData, handleEditCancel }) => {
  const { id } = useParams();
  const [updateQues] = useUpdateQuesMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();


  useEffect(() => {
    if (singleData) {
      reset({
        question: singleData.question,
        options: singleData.options || ["", "", "", ""],
        answer: singleData.answer,
        explanation: singleData.explanation,
      });
      setImagePreview(singleData.question_image || null);
    }
  }, [singleData, reset]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setNewImageFile(null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (newImageFile) {
        formData.append("question_image", newImageFile);
      }


      const topicId = typeof singleData?.topic === 'object' ? singleData?.topic?._id : (id || singleData?.topic);

      const updatedFields = {
        topic: topicId,
        question: data.question,
        options: data.options,
        answer: data.answer,
        explanation: data.explanation,
      };


      formData.append("data", JSON.stringify(updatedFields));

      const res = await updateQues({
        args: formData,
        id: singleData?._id,
      }).unwrap();

      if (res?.success) {
        message.success(res?.message || "Updated successfully");
        refetch();
        handleEditCancel();
      }
    } catch (error) {
      message.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 space-y-5 font-title"
      noValidate
    >
      {/* --- Image Section --- */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700 text-sm">Question Image</label>
        {!imagePreview ? (
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all group">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <FaCloudUploadAlt size={28} className="text-gray-400 group-hover:text-blue-500" />
            <p className="mt-1 text-xs text-gray-500">Upload new image</p>
          </div>
        ) : (
          <div className="relative w-full h-40 rounded-xl overflow-hidden border bg-gray-100">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}
      </div>

      {/* --- Question --- */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Question</label>
        <input
          {...register("question", { required: true })}
          placeholder="Update question content"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
        />
        {errors.question && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      {/* --- Options --- */}
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <label className="block mb-1 font-medium text-gray-500 text-xs uppercase">Option {index + 1}</label>
            <input
              {...register(`options.${index}`, { required: true })}
              placeholder={`Option ${index + 1}`}
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:border-blue-500 outline-none"
            />
          </div>
        ))}
      </div>

      {/* --- Answer & Explanation --- */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Correct Answer</label>
          <input
            {...register("answer", { required: true })}
            placeholder="Correct answer"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Explanation</label>
          <textarea
            {...register("explanation", { required: true })}
            placeholder="Explanation content"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* --- Actions --- */}
      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={handleEditCancel}
          className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-all font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md font-semibold transition-all"
        >
          Update Question
        </button>
      </div>
    </form>
  );
};

export default EditAdiQuesForm;