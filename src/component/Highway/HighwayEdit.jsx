import { useForm } from "react-hook-form";

const HighwayEdit  = () => {
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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 space-y-6"
        noValidate
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">
           Topic Name
          </label>
          <input
            {...register("topicName", { required: true })}
            placeholder="topic name..."
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.topicName && (
            <p className="text-red-500 text-sm mt-1">
              Topic Name is required
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
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
              {...register("image", { required: true })}
              id="file-upload"
              type="file"
              className="hidden"
            />
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              Upload Field is required
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
           Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="tdescription..."
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              Description is required
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

export default HighwayEdit;
