import { useForm } from "react-hook-form";
import { useUpdateHighwayTopicMutation } from "../../redux/feature/highway/highwayApi";
import { message } from "antd";

const HighwayEdit  = ({refetch,singleData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
const [updateHighTopic]=useUpdateHighwayTopicMutation()
const onSubmit = async (formValues) => {
  // console.log("formValues---->",formValues);
    const formData = new FormData();

    // prepare JSON payload
    const dataPayload = {
      name: formValues?.topicName,
      // description: formValues?.description,
    };
    formData.append("data", JSON.stringify(dataPayload));

    const file = formValues?.image?.[0];
    if (file) {
      formData.append("icon", file, file.name);
    }
    console.log("Submitting:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  

    try {
      const res = await updateHighTopic({args:formData,id:singleData?._id}).unwrap();
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
              {...register("image")}
              id="file-upload"
              type="file"
              className="hidden"
            />
          </label>
    
        </div>
        {/* <div>
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
        </div> */}
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

export default HighwayEdit;
