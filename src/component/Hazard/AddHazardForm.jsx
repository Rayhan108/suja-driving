import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateHazVedioMutation } from "../../redux/feature/hazard/hazardApi";
import { message } from "antd";

const HazardForm = () => {
  const {id} = useParams()
  const topicId = id
  const [createHazVedio]=useCreateHazVedioMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit =async (formValues) => {
    const formData = new FormData();

    // file
    formData.append("video", formValues.video[0]);

    // parse dangerTimes
    const parsedDangerTimes = formValues.dangerTimes
      .split(",")
      .map((t) => parseFloat(t.trim()))
      .filter((t) => !isNaN(t));

    // prepare JSON payload
    const dataPayload = {
      hazardTopic:topicId,
      dangerTimes: parsedDangerTimes,
    };
    formData.append("data", JSON.stringify(dataPayload));

    console.log("Submitting:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const res = await createHazVedio(formData).unwrap();
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

  return (
<form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
>
  <h2 className="text-2xl font-semibold text-gray-800 text-center">
    Add Hazard Video
  </h2>

  {/* Danger Times */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Danger Times
      <span className="text-sm text-gray-500 ml-1">(comma separated)</span>
    </label>
    <input
      {...register("dangerTimes", { required: true })}
      placeholder="15.5, 45.75, 120.0, 344"
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 outline-none transition"
    />
    {errors.dangerTimes && (
      <p className="text-red-500 text-sm mt-1">Required</p>
    )}
  </div>

  {/* Video Upload */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Upload Video</label>
    <label
      htmlFor="video-upload"
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-400 mb-2"
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
      <span className="text-gray-600 text-sm">
        Drag & drop or click to upload
      </span>
      <input
        type="file"
        id="video-upload"
        {...register("video", { required: true })}
        className="hidden"
      />
    </label>
    {errors.video && (
      <p className="text-red-500 text-sm mt-1">Video required</p>
    )}
  </div>

  {/* Buttons */}
  <div className="flex gap-4">

    <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      Submit
    </button>
  </div>
</form>

  );
};

export default HazardForm;
