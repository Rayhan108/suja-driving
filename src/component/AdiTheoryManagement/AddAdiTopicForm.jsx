import React from "react";
import { useForm } from "react-hook-form";

const AddAdiTopicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  const onCancel = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 space-y-6"
      noValidate
    >
      <div className="flex justify-between space-x-4">
        <div className="w-1/2">
          <label className="block mb-1 font-medium text-gray-700">
            Select Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Category
            </option>
            <option value="cat1">Category 1</option>
            <option value="cat2">Category 2</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>


      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Topic Name</label>
        <input
          {...register("topicName", { required: true })}
          placeholder="Enter Name"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.topicName && (
          <p className="text-red-500 text-sm mt-1">Topic Name is required</p>
        )}
      </div>

    <div>
  <label className="block mb-1 font-medium text-gray-700">Upload Icon</label>
  <label
    htmlFor="file-upload"
    className="cursor-pointer flex justify-center items-center border border-gray-300 rounded-md px-3 py-3 hover:bg-gray-100 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
      />
    </svg>
    <input
      {...register("icon", { required: true })}
      id="file-upload"
      type="file"
      className="hidden"
    />
  </label>
  {errors.icon && (
    <p className="text-red-500 text-sm mt-1">Upload Field is required</p>
  )}
</div>



      <div className="flex gap-12  mt-6">
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
          Add
        </button>
      </div>
    </form>
  );
};

export default AddAdiTopicForm;
