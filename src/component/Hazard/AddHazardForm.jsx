import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateHazVedioMutation } from "../../redux/feature/hazard/hazardApi";
import { message } from "antd";
import { useState } from "react";

const HazardForm = ({ refetch, setAddVedioModalOpen }) => {
  const { id } = useParams();
  const topicId = id;
  const [createHazVedio] = useCreateHazVedioMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // Watch for the form state, including file inputs
  } = useForm();

  // Watch for thumbnail file input
  const watchedThumbnail = watch("thumbnail"); // Get the thumbnail file from form state
 const watchedVideo = watch("video"); 
  // Form submission handler
  const onSubmit = async (formValues) => {
    const formData = new FormData();
    console.log("form values-------->", formValues);

    // Ensure video file is selected and append it to formData
    const video = formValues?.video?.[0];
    if (video) {
      formData.append("video", video, video.name);
    } else {
      message.error("Please select a video");
      return;
    }

    // Ensure thumbnail image is selected and append it to formData
    const file = formValues?.thumbnail?.[0];
    if (file) {
      formData.append("thumbnail", file, file.name);
    } else {
      message.error("Please select an image file.");
      return;
    }

    // Parse dangerTimes and prepare JSON payload
    const parsedDangerTimes = formValues.dangerTimes
      .split(",")
      .map((t) => parseFloat(t.trim()))
      .filter((t) => !isNaN(t));

    const dataPayload = {
      hazardTopic: topicId,
      dangerTimes: parsedDangerTimes,
    };
    formData.append("data", JSON.stringify(dataPayload));

    // Log form data for debugging
    console.log("Submitting:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // API call to create hazard video
    try {
      const res = await createHazVedio(formData).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        reset();
        setAddVedioModalOpen(false);
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
        {errors.video && <p className="text-red-500 text-sm mt-1">Video required</p>}
          {/* Display video file name */}
        {watchedVideo && watchedVideo[0] && (
          <p className="text-sm text-gray-600 mt-2">
            Selected video: {watchedVideo[0].name}
          </p>
        )}
      </div>

      {/* Thumbnail Image Upload */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Thumbnail Image
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
            {...register("thumbnail")}
            id="file-upload"
            type="file"
            className="hidden"
          />
        </label>

        {/* Display image preview */}
        {watchedThumbnail && watchedThumbnail[0] && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(watchedThumbnail[0])}
              alt="Thumbnail Preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Display thumbnail file name */}
        {watchedThumbnail?.[0] && (
          <p className="text-sm text-gray-600 mt-2">
            Selected thumbnail: {watchedThumbnail?.[0].name}
          </p>
        )}
      </div>

      {/* Submit Button */}
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
