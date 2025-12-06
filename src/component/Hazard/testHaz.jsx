import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateHazVedioMutation, useGeneratePresignedUrlMutation } from "../../redux/feature/hazard/hazardApi";
import { message } from "antd";
import { useEffect, useState } from "react";

const HazardForm = ({ refetch, setAddVedioModalOpen, isAddVedioModalOpen }) => {
  const [resFile, setResFile] = useState("");
  const [url, setUrl] = useState("");
  console.log("resfile--------->",resFile);
  console.log("vedio url--------->",url);
  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // 'uploading', 'success', 'error'

  const { id } = useParams();
  const topicId = id;
  const [createHazVedio] = useCreateHazVedioMutation();
  const [generatePresignedUrl] = useGeneratePresignedUrlMutation();

  useEffect(() => {
    const uploadVideo = async () => {
      const payload = {
        fileType: "video/mp4",
        fileCategory: "video"
      };

      try {
        const presignedRes = await generatePresignedUrl(payload).unwrap();
        console.log("presignedRes----->", presignedRes);
        const uploadURL = presignedRes?.uploadURL;
        setUrl(uploadURL);
        setResFile(presignedRes?.fileName);
      } catch (error) {
        console.error("Error generating presigned URL", error);
      }
    };

    if (isAddVedioModalOpen) {
      uploadVideo();
      // Reset progress when modal opens
      setUploadProgress(0);
      setIsUploading(false);
      setUploadStatus("");
    }
  }, [isAddVedioModalOpen, generatePresignedUrl]);

  // Function to upload file with progress tracking using XMLHttpRequest
  const uploadFileWithProgress = (uploadUrl, file, contentType) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Handle upload complete
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus("success");
          resolve(xhr.response);
        } else {
          setUploadStatus("error");
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      // Handle error
      xhr.addEventListener('error', () => {
        setUploadStatus("error");
        reject(new Error('Upload failed'));
      });

      // Handle abort
      xhr.addEventListener('abort', () => {
        setUploadStatus("error");
        reject(new Error('Upload aborted'));
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.send(file);
    });
  };

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

  // Form submission handler
  const onSubmit = async (formValues) => {
    const formData = new FormData();

    // Ensure video file is selected
    const video = formValues?.video?.[0];
    // if (video) {
    //   formData.append("video", video, video.name);
    // } else {
    //   message.error("Please select a video");
    //   return;
    // }

    // Ensure thumbnail image is selected
    const file = formValues?.thumbnail?.[0];
    if (file) {
      formData.append("thumbnail", file, file.name);
    } else {
      message.error("Please select an image file.");
      return;
    }

    // Upload video with progress tracking
    if (video && url) {
      try {
        setIsUploading(true);
        setUploadProgress(0);
        setUploadStatus("uploading");

        await uploadFileWithProgress(url, video, 'video/mp4');

        console.log("Upload succeeded!");
     
      } catch (error) {
        console.error("Upload failed:", error);
        message.error("Video upload failed");
        setIsUploading(false);
        setUploadStatus("error");
        return;
      }
    }

    // Prepare the hazards data array
    const hazardsData = formValues.hazards.map((hazard) => ({
      start: parseFloat(hazard.start),
      end: parseFloat(hazard.end),
      type: hazard.type,
    }));

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
      hazards: hazardsData,
    };
    formData.append("data", JSON.stringify(dataPayload));

    // API call to create hazard video
    try {
      const res = await createHazVedio(formData).unwrap();
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
    } finally {
      setIsUploading(false);
    }
  };

  // Get progress bar color based on status
  const getProgressBarColor = () => {
    switch (uploadStatus) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-600";
    }
  };

  // Get status text
  const getStatusText = () => {
    switch (uploadStatus) {
      case "success":
        return "Upload Complete!";
      case "error":
        return "Upload Failed!";
      default:
        return "Uploading...";
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

      {/* Hazard Times */}
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
            accept="video/mp4,video/*"
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

        {/* ========== PROGRESS BAR SECTION ========== */}
        {isUploading && (
          <div className="mt-4 space-y-2">
            {/* Progress Header */}
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${
                uploadStatus === "success" ? "text-green-600" : 
                uploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                {getStatusText()}
              </span>
              <span className={`text-sm font-bold ${
                uploadStatus === "success" ? "text-green-600" : 
                uploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                {uploadProgress}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${getProgressBarColor()}`}
                style={{ width: `${uploadProgress}%` }}
              >
                {/* Animated stripes for uploading state */}
                {uploadStatus === "uploading" && uploadProgress < 100 && (
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {uploadStatus === "uploading" && uploadProgress < 100 && "Please wait..."}
                {uploadStatus === "success" && "✓ Video uploaded successfully"}
                {uploadStatus === "error" && "✗ Upload failed, please try again"}
              </span>
              {watchedVideo?.[0] && (
                <span>
                  {(watchedVideo[0].size / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </div>
          </div>
        )}
        {/* ========== END PROGRESS BAR SECTION ========== */}
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
            accept="image/*"
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
          disabled={isUploading}
          className={`w-full px-4 py-2 rounded-lg shadow-md transition ${
            isUploading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading... {uploadProgress}%
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default HazardForm;