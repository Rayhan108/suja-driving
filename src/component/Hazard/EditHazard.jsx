import React from "react";
import { useForm } from "react-hook-form";

const EditHazard = () => {
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
      className="max-w-xs mx-auto p-4 space-y-4 bg-white rounded-md shadow-sm"
      noValidate
    >
      <div className="flex items-center space-x-2">
        <label className="text-gray-800 font-medium">Time :</label>
        <input
          {...register("time", { required: true })}
          type="time"
          className="border border-gray-300 rounded-md px-3 py-1 text-center"
          style={{ width: "110px" }}
        />
      </div>
      {errors.time && (
        <p className="text-red-500 text-sm mt-1">Time is required</p>
      )}

      <div>
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

export default EditHazard;
