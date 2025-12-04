import { useForm, useFieldArray } from "react-hook-form";
import { message } from "antd";
import { useGeneratePresignedUrlMutation, useUpdateHazVedioMutation } from "../../redux/feature/hazard/hazardApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditHazVedio = ({ refetch, singleData, setEditModalOpen, isEditModalOpen }) => {
  const { id } = useParams();
  const topicId = id;
  
  const [resFile, setResFile] = useState("");
  const [url, setUrl] = useState("");
  
  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const [updateHazVedio] = useUpdateHazVedioMutation();
  const [generatePresignedUrl] = useGeneratePresignedUrlMutation();

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
    name: "hazards",
  });

  const watchedThumbnail = watch("thumbnail");
  const watchedVideo = watch("video");

  // ✅ Helper function: Milliseconds to Seconds (only for initial load)
  const msToSeconds = (ms) => {
    if (ms === undefined || ms === null || ms === "") return "";
    return (Number(ms) / 1000).toFixed(2);
  };

  useEffect(() => {
    const uploadVideo = async () => {
      const payload = {
        fileType: "video/mp4",
        fileCategory: "video"
      };

      try {
        const presignedRes = await generatePresignedUrl(payload).unwrap();
        const uploadURL = presignedRes?.uploadURL;
        setUrl(uploadURL);
        setResFile(presignedRes?.fileName);
      } catch (error) {
        console.error("Error generating presigned URL", error);
      }
    };

    if (isEditModalOpen) {
      uploadVideo();
      setUploadProgress(0);
      setIsUploading(false);
      setUploadStatus("");
    }
  }, [isEditModalOpen, generatePresignedUrl]);

  // ✅ Initialize form - Convert ms to seconds for display
  useEffect(() => {
    if (singleData && singleData.hazards) {
      const convertedHazards = singleData.hazards.map((hazard) => ({
        start: msToSeconds(hazard.start),  // ✅ Convert ms to seconds for display
        end: msToSeconds(hazard.end),      // ✅ Convert ms to seconds for display
        type: hazard.type || "",
      }));

      reset({
        hazards: convertedHazards,
      });
    }
  }, [singleData, reset]);

  // Function to upload file with progress tracking
  const uploadFileWithProgress = (uploadUrl, file, contentType) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus("success");
          resolve(xhr.response);
        } else {
          setUploadStatus("error");
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        setUploadStatus("error");
        reject(new Error('Upload failed'));
      });

      xhr.addEventListener('abort', () => {
        setUploadStatus("error");
        reject(new Error('Upload aborted'));
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.send(file);
    });
  };

  const onSubmit = async (formValues) => {
    const formData = new FormData();

    const video = formValues?.video?.[0];
    const file = formValues?.thumbnail?.[0];
    
    if (file) {
      formData.append("thumbnail", file, file.name);
    }

    // Upload video with progress tracking
    if (video && url) {
      try {
        setIsUploading(true);
        setUploadProgress(0);
        setUploadStatus("uploading");

        await uploadFileWithProgress(url, video, 'video/mp4');
        message.success("Video uploaded successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
        message.error("Video upload failed");
        setIsUploading(false);
        setUploadStatus("error");
        return;
      }
    }

    // ✅ Send seconds directly (no conversion needed)
    const hazardsData = formValues.hazards.map((hazard) => ({
      start: parseFloat(hazard.start),  // ✅ Send as seconds
      end: parseFloat(hazard.end),      // ✅ Send as seconds
      type: hazard.type,
    }));

    // Validate
    const isValid = hazardsData.every(
      (hazard) => !isNaN(hazard.start) && !isNaN(hazard.end)
    );
    if (!isValid) {
      message.error("Start and end times must be valid numbers.");
      setIsUploading(false);
      return;
    }

    const dataPayload = {
      hazardTopic: topicId,
      video_url: resFile,
      hazards: hazardsData,  // ✅ Seconds format
    };
    
    console.log("data payload (in seconds)--->", dataPayload);
    formData.append("data", JSON.stringify(dataPayload));
    
    const id = singleData?._id;

    try {
      const res = await updateHazVedio({ args: formData, id }).unwrap();
      if (res?.success) {
        message.success(res?.message);
        refetch();
        reset();
        setEditModalOpen(false);
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    } finally {
      setIsUploading(false);
    }
  };

  const getProgressBarColor = () => {
    switch (uploadStatus) {
      case "success": return "bg-green-500";
      case "error": return "bg-red-500";
      default: return "bg-blue-600";
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case "success": return "Upload Complete!";
      case "error": return "Upload Failed!";
      default: return "Uploading...";
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

      {/* Hazard Times */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Hazard Times (in Seconds)
        </label>
        
        {/* Header */}
        {fields.length > 0 && (
          <div className="flex space-x-2 mb-2 text-sm text-gray-500 font-medium">
            <span className="w-full">Start (sec)</span>
            <span className="w-full">End (sec)</span>
          </div>
        )}

        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2 mb-3 p-3 bg-gray-50 rounded-lg border">
            <div className="flex space-x-2">
              <input
                {...register(`hazards[${index}].start`, { 
                  required: true,
                  min: 0
                })}
                type="number"
                step="0.01"
                placeholder="e.g. 5"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 outline-none transition"
              />
              <input
                {...register(`hazards[${index}].end`, { 
                  required: true,
                  min: 0
                })}
                type="number"
                step="0.01"
                placeholder="e.g. 10"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 outline-none transition"
              />
            </div>
            
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-sm hover:text-red-700"
            >
              ✕ Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ start: "", end: "", type: "" })}
          className="bg-blue-600 text-white rounded-lg py-2 px-4 mt-2 hover:bg-blue-700 transition"
        >
          + Add Hazard
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
          <span className="text-gray-600 text-sm">Click to upload video</span>
          <input
            type="file"
            id="video-upload"
            accept="video/mp4,video/*"
            {...register("video")}
            className="hidden"
          />
        </label>
        
        {watchedVideo?.[0] && (
          <p className="text-sm text-gray-600 mt-2">
            ✓ {watchedVideo[0].name}
          </p>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{getStatusText()}</span>
              <span className="text-sm font-bold">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-full rounded-full transition-all ${getProgressBarColor()}`}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Thumbnail
        </label>
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex justify-center items-center border border-gray-300 rounded-md px-3 py-3 hover:bg-gray-100 transition"
        >
          <span className="text-gray-600 text-sm">Click to upload thumbnail</span>
          <input
            {...register("thumbnail")}
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
        {watchedThumbnail?.[0] && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(watchedThumbnail[0])}
              alt="Preview"
              className="max-w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isUploading}
        className={`w-full py-3 rounded-lg font-medium transition ${
          isUploading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isUploading ? `Uploading... ${uploadProgress}%` : "Update"}
      </button>
    </form>
  );
};

export default EditHazVedio;