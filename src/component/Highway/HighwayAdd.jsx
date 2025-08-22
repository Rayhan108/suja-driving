import { message } from "antd";
import { useForm } from "react-hook-form";
import { useCreateHighwaySignMutation } from "../../redux/feature/highway/highwayApi";

const HighwayAdd = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [createHighway] = useCreateHighwaySignMutation();

  const onSubmit = async (formValues) => {
    const formData = new FormData();

    // prepare JSON payload
    const dataPayload = {
      name: formValues?.name,
      // description: formValues?.description,
    };
    formData.append("data", JSON.stringify(dataPayload));

    const file = formValues?.image?.[0];
    if (file) {
      formData.append("icon", file, file.name);
    } else {
      message.error("Please select an image file.");
      return;
    }
    console.log("Submitting:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const res = await createHighway(formData).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        reset();
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
            {...register("name", { required: true })}
            placeholder="Topic Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.signType && (
            <p className="text-red-500 text-sm mt-1">Topic Name is required</p>
          )}
        </div>
        {/* <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="description"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
        </div> */}

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

        <div className="flex gap-12  mt-6">
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

export default HighwayAdd;
