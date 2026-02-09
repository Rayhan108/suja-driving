import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateTestScore = () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm ();
    
      const onSubmit = (data) => {
        // console.log("Form Data:", data);
        reset();
      };
    
      const onCancel = () => {
        reset();
      };
    return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 space-y-6 font-title"
        noValidate
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">
           Test Type
          </label>
          <input
            {...register("testType", { required: true })}
            placeholder="test type..."
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.testType && (
            <p className="text-red-500 text-sm mt-1">
              Test Type is required
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
           Time
          </label>
          <input
            {...register("time", { required: true })}
            
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">
              Time is required
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
          Attempted to Question
          </label>
          <input
            {...register("question", { required: true })}
            placeholder='50'
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">
              Question is required
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
        Pass mark
          </label>
          <input
            {...register("pass", { required: true })}
            placeholder='35%'
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.pass && (
            <p className="text-red-500 text-sm mt-1">
              Pass Mark is required
            </p>
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
    </div>
    );
};

export default UpdateTestScore;