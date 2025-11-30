import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useUpdateHazVedioMutation } from "../../redux/feature/hazard/hazardApi";
import { useState, useEffect } from "react";

const EditHazVedio = ({ refetch, singleData, setEditModalOpen }) => {
  const { id } = useParams();
  const videoId = singleData?._id;
  const [updateHazVedio] = useUpdateHazVedioMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hazards", // Name of the field array for hazard data
  });

  const watchedThumbnail = watch("thumbnail");
  const watchedVideo = watch("video");

  useEffect(() => {
    // Initialize form with singleData (existing hazard video)
    if (singleData) {
      reset({
        hazards: singleData.hazards || [],
      });
    }
  }, [singleData, reset]);

  const onSubmit = async (formValues) => {
    const formData = new FormData();

    // Update video if it's changed
    if (formValues?.video?.[0]) {
      formData.append("video", formValues.video[0], formValues.video[0].name);
    }

    // Update thumbnail if it's changed
    if (formValues?.thumbnail?.[0]) {
      formData.append("thumbnail", formValues.thumbnail[0], formValues.thumbnail[0].name);
    }

    // Prepare the hazards data array with parsed number values for start and end
    const hazardsData = formValues.hazards.map((hazard) => ({
      start: parseFloat(hazard.start), 
      end: parseFloat(hazard.end),
      // type: hazard.type || "Unknown", 
    }));

    // Only append hazards if there's any updated hazard data
    if (hazardsData.length > 0) {
      formData.append("data", JSON.stringify({ hazardTopic: id, hazards: hazardsData }));
    }

    // Validate hazard data before submission
    const isValid = hazardsData.every(
      (hazard) => !isNaN(hazard.start) && !isNaN(hazard.end)
    );
    if (!isValid) {
      message.error("Start and end times must be valid numbers.");
      return;
    }

    try {
      const res = await updateHazVedio({ args: formData, id: videoId }).unwrap();
      if (res?.success) {
        message.success(res?.message);
        refetch();
        reset();
        setEditModalOpen(false);
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Edit Hazard Video
      </h2>

      {/* Hazard Times (Start, End, Type) */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Hazard Times (Start, End, Type)
        </label>
        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2 mb-4">
            <div className="flex space-x-2">
              <input
                {...register(`hazards[${index}].start`, { required: true })}
                placeholder="Start Time"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 outline-none transition"
              />
              <input
                {...register(`hazards[${index}].end`, { required: true })}
                placeholder="End Time"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 outline-none transition"
              />
              {/* <input
                {...register(`hazards[${index}].type`, { required: true })}
                placeholder="Type"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 outline-none transition"
              /> */}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-sm"
            >
              Remove Hazard
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ start: "", end: "", type: "" })}
          className="bg-blue-600 text-white rounded-lg py-2 px-4 mt-2"
        >
          Add More Hazard
        </button>
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
            {...register("video")}
            className="hidden"
          />
        </label>
        {errors.video && (
          <p className="text-red-500 text-sm mt-1">Video required</p>
        )}
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
        {watchedThumbnail && watchedThumbnail[0] && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(watchedThumbnail[0])}
              alt="Thumbnail Preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
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

export default EditHazVedio;
