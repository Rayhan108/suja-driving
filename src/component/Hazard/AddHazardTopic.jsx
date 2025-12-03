
import { useForm } from "react-hook-form";
import { useCreateHazTopicMutation,  } from "../../redux/feature/hazard/hazardApi";
import { message } from "antd";
import { useParams } from "react-router-dom";


const AddHazardTopic = ({refetch,setIsModalOpen}) => {

    const [createHazardTopic] = useCreateHazTopicMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();
 const image = watch("category_image");
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Creating a new FormData object to handle the form submission
    const formData = new FormData();

    // Appending fields to the FormData object
    formData.append(
      "data",
      JSON.stringify({
        name: data?.name,
      })
    );

    const file = data?.category_image?.[0];
    if (file) {
      formData.append("topic_icon", file, file.name);
    }else {
      message.error("Please select an image file.");
      return;
    }


    // Log the FormData contents
    console.log("Form Data Contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    // try {
      const res = await createHazardTopic(formData).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        reset();
        setIsModalOpen(false)
      } 
    // } catch (error) {
    //   message.error(error?.data?.message);
    // }
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
        <label className="block mb-1 font-medium text-gray-700 font-title">
        Topic Name
        </label>
        <input
          {...register("name", { required: true })}
          placeholder="Topic Name..."
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Topic Name is required</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Icon
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
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("category_image")}
          />
                                {image?.[0] && (
          <p className="text-sm text-gray-600 mt-2">
            Selected Image: {image?.[0].name}
          </p>
        )}
        </label>
      </div>

      <div className="flex gap-12  mt-6 font-title">

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

export default AddHazardTopic;
