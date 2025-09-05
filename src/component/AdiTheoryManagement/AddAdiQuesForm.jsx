import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { message } from "antd";
import { toast } from "react-toastify";

const AddAdiQuesForm = ({refetch,setIsModalOpen}) => {
  const [createQues]=useCreateQuesMutation()
  const {id} = useParams();
  console.log("id------->",id);
  const topicId = id
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    
  } = useForm();

  const onSubmit = async (data) => {
    const modifiedData={
      topic:topicId,
      ...data
    }
    console.log("Form Data:", modifiedData);
     try {
      const res = await createQues({args:modifiedData,
      id:id,}).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        reset();
        setIsModalOpen(false)
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
    reset();
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
  <div className="flex justify-between space-x-4">


    {/* <div className="w-full">
      <label className="block mb-1 font-medium text-gray-700">Select Topic</label>
      <select
        {...register("topic", { required: true })}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        defaultValue=""
      >
        <option value="" disabled>
          Topics
        </option>
        <option value="68a5a74c5a16af0c48ac2b96">Topic 1</option>
        <option value="some-other-id">Topic 2</option>
      </select>
      {errors.topic && (
        <p className="text-red-500 text-sm mt-1">Topic is required</p>
      )}
    </div> */}
  </div>

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
    <input
      {...register("options[0]", { required: true })}
      placeholder="Option 1"
      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
    />
    {errors.options?.[0] && (
      <p className="text-red-500 text-sm mt-1">Option 1 is required</p>
    )}

    <input
      {...register("options[1]", { required: true })}
      placeholder="Option 2"
      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
    />
    {errors.options?.[1] && (
      <p className="text-red-500 text-sm mt-1">Option 2 is required</p>
    )}

    <input
      {...register("options[2]", { required: true })}
      placeholder="Option 3"
      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
    />
    {errors.options?.[2] && (
      <p className="text-red-500 text-sm mt-1">Option 3 is required</p>
    )}

    <input
      {...register("options[3]", { required: true })}
      placeholder="Option 4"
      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
    />
    {errors.options?.[3] && (
      <p className="text-red-500 text-sm mt-1">Option 4 is required</p>
    )}
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

  <div className="flex gap-12  mt-6">
    {/* <button
      type="button"
      onClick={onCancel}
      className="w-full px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 "
    >
      Cancel
    </button> */}
    <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Add
    </button>
  </div>
</form>

  );
};

export default AddAdiQuesForm;
