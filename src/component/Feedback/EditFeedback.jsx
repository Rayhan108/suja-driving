import { useForm } from "react-hook-form";

const EditFeedback = () => {
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
          <label className="block mb-1 font-medium text-gray-700">Reply</label>
          <textarea
            {...register("reply", { required: true })}
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-md px-3 py-4"
          />
          {errors.reply && (
            <p className="text-red-500 text-sm mt-1">reply is required</p>
          )}
        </div>

        <div className="  mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFeedback;
