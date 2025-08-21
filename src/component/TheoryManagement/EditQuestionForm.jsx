import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { message } from "antd";

const EditQuesForm = ({ refetch, singleData,handleEditCancel }) => {
  const { id } = useParams();
  const topicId = id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,  // to reset the form values
  } = useForm();

  const [updateQues] = useUpdateQuesMutation();

  // Set the default form values when `singleData` is loaded
  useEffect(() => {
    if (singleData) {
      reset({
        question: singleData.question,
        options: singleData.options || ["", "", "", ""], // Ensure options are always an array with 4 items
        answer: singleData.answer,
        explanation: singleData.explanation,
      });
    }
  }, [singleData, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const modifiedData = {
      topic: topicId,
      ...data,
    };

    try {
      const res = await updateQues({
        args: modifiedData,
        id: singleData?._id,
      }).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        reset();
        handleEditCancel()
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const onCancel = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 space-y-6 font-title"
      noValidate
    >
      <div>
        <label className="block mb-1 font-medium text-gray-700">Question</label>
        <input
          {...register("question", { required: true })}
          placeholder="Write Here"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.question && (
          <p className="text-red-500 text-sm mt-1">Question is required</p>
        )}
      </div>

      {/* Options for answers */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Answers</label>
        {["options[0]", "options[1]", "options[2]", "options[3]"].map((option, index) => (
          <div key={option}>
            <input
              {...register(option, { required: true })}
              placeholder={`Option ${index + 1}`}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            {errors.options?.[index] && (
              <p className="text-red-500 text-sm mt-1">{`Option ${index + 1} is required`}</p>
            )}
          </div>
        ))}
      </div>

      {/* Correct Answer */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Correct Answer</label>
        <input
          {...register("answer", { required: true })}
          placeholder="Correct Answer"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.answer && (
          <p className="text-red-500 text-sm mt-1">Answer is required</p>
        )}
      </div>

      {/* Explanation */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Explanation</label>
        <textarea
          {...register("explanation", { required: true })}
          placeholder="Write Here"
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
        />
        {errors.explanation && (
          <p className="text-red-500 text-sm mt-1">Explanation is required</p>
        )}
      </div>

      <div className="flex gap-12 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="w-full px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditQuesForm;
