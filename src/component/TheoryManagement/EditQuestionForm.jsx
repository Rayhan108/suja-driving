import React from "react";
import { useForm } from "react-hook-form";

const EditQuesForm = () => {
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

        <div className="w-1/2">
          <label className="block mb-1 font-medium text-gray-700">Select Topic</label>
          <select
            {...register("topic", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Topics
            </option>
            <option value="topic1">Topic 1</option>
            <option value="topic2">Topic 2</option>
          </select>
          {errors.topic && (
            <p className="text-red-500 text-sm mt-1">Topic is required</p>
          )}
        </div>
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

      <div>
        <label className="block mb-1 font-medium text-gray-700">Answer</label>
        <input
          {...register("answer", { required: true })}
          placeholder="Write Here"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.answer && (
          <p className="text-red-500 text-sm mt-1">Answer is required</p>
        )}
      </div>

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

export default EditQuesForm;
