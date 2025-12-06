import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateHazVedioMutation, useGeneratePresignedUrlMutation } from "../../redux/feature/hazard/hazardApi";
import { message } from "antd";
import { useState } from "react";

const HazardForm = ({ refetch, setAddVedioModalOpen, isAddVedioModalOpen }) => {
  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // 'generating', 'uploading', 'success', 'error'

  const { id } = useParams();
  const topicId = id;
  const [createHazVedio] = useCreateHazVedioMutation();
  const [generatePresignedUrl] = useGeneratePresignedUrlMutation();

  // Upload file with progress tracking
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
          resolve(xhr.response);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.addEventListener('abort', () => {
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

  // ✅ Form submission handler - Updated
  const onSubmit = async (formValues) => {
    const video = formValues?.video?.[0];
    if (!video) {
      message.error("Please select a video");
      return;
    }

    const thumbnailFile = formValues?.thumbnail?.[0];
    if (!thumbnailFile) {
      message.error("Please select an image file.");
      return;
    }

    // Validate hazards
    const hazardsData = formValues.hazards?.map((hazard) => ({
      start: parseFloat(hazard.start),
      end: parseFloat(hazard.end),
      type: hazard.type,
    })) || [];

    const isValid = hazardsData.length === 0 || hazardsData.every(
      (hazard) => !isNaN(hazard.start) && !isNaN(hazard.end)
    );
    if (!isValid) {
      message.error("Start and end times must be valid numbers.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // ✅ Step 1: Generate fresh presigned URL প্রতিবার
      setUploadStatus("generating");
      console.log("Generating presigned URL...");
      
      const payload = {
        fileType: "video/mp4",
        fileCategory: "video"
      };
      
      const presignedRes = await generatePresignedUrl(payload).unwrap();
      console.log("presignedRes----->", presignedRes);
      
      const uploadURL = presignedRes?.uploadURL;
      const fileName = presignedRes?.fileName;
      
      if (!uploadURL || !fileName) {
        throw new Error("Failed to get upload URL");
      }
      
      // ✅ Step 2: Upload video to S3
      setUploadStatus("uploading");
      console.log("Starting upload to:", uploadURL);
      
      await uploadFileWithProgress(uploadURL, video, 'video/mp4');
      console.log("Video upload succeeded!");
      
      // ✅ Step 3: Submit form data to backend
      setUploadStatus("submitting");
      
      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile, thumbnailFile.name);

      const dataPayload = {
        hazardTopic: topicId,
        video_url: fileName,
        hazards: hazardsData,
      };
      formData.append("data", JSON.stringify(dataPayload));

      const res = await createHazVedio(formData).unwrap();
      
      if (res?.success) {
        setUploadStatus("success");
        message.success(res?.message);
        refetch();
        reset();
        
        // একটু delay দিয়ে modal বন্ধ করবো যাতে success দেখা যায়
        setTimeout(() => {
          setAddVedioModalOpen(false);
          // Reset states after modal closes
          setUploadProgress(0);
          setIsUploading(false);
          setUploadStatus("");
        }, 1000);
      } else {
        setUploadStatus("error");
        message.error(res?.message);
        setIsUploading(false);
      }
      
    } catch (error) {
      console.error("Error:", error);
      setUploadStatus("error");
      message.error(error?.data?.message || error?.message || "Something went wrong");
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
      case "generating":
        return "Preparing upload...";
      case "uploading":
        return "Uploading video...";
      case "submitting":
        return "Saving data...";
      case "success":
        return "Upload Complete! ✓";
      case "error":
        return "Upload Failed! ✗";
      default:
        return "Processing...";
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
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition ${
            watchedVideo?.[0] 
              ? "border-green-400 bg-green-50" 
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {watchedVideo?.[0] ? (
            <>
              <svg className="h-10 w-10 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-600 text-sm font-medium">
                {watchedVideo[0].name}
              </span>
              <span className="text-gray-500 text-xs mt-1">
                ({(watchedVideo[0].size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </>
          ) : (
            <>
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
            </>
          )}
          <input
            type="file"
            id="video-upload"
            accept="video/mp4,video/*"
            {...register("video", { required: true })}
            className="hidden"
            disabled={isUploading}
          />
        </label>
        {errors.video && <p className="text-red-500 text-sm mt-1">Video required</p>}

        {/* ========== PROGRESS BAR SECTION ========== */}
        {isUploading && (
          <div className="mt-4 space-y-2">
            {/* Progress Header */}
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium flex items-center gap-2 ${
                uploadStatus === "success" ? "text-green-600" : 
                uploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                {/* Spinner for loading states */}
                {(uploadStatus === "generating" || uploadStatus === "uploading" || uploadStatus === "submitting") && (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {getStatusText()}
              </span>
              <span className={`text-sm font-bold ${
                uploadStatus === "success" ? "text-green-600" : 
                uploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                {uploadStatus === "uploading" ? `${uploadProgress}%` : ""}
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${getProgressBarColor()}`}
                style={{ 
                  width: uploadStatus === "generating" ? "10%" : 
                         uploadStatus === "uploading" ? `${uploadProgress}%` :
                         uploadStatus === "submitting" ? "95%" :
                         uploadStatus === "success" ? "100%" : 
                         `${uploadProgress}%`
                }}
              >
                {(uploadStatus === "uploading" || uploadStatus === "generating") && (
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                )}
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between text-xs text-gray-500 pt-1">
              <span className={uploadStatus === "generating" ? "text-blue-600 font-medium" : 
                             uploadStatus !== "generating" ? "text-green-600" : ""}>
                1. Prepare
              </span>
              <span className={uploadStatus === "uploading" ? "text-blue-600 font-medium" : 
                             ["submitting", "success"].includes(uploadStatus) ? "text-green-600" : ""}>
                2. Upload
              </span>
              <span className={uploadStatus === "submitting" ? "text-blue-600 font-medium" : 
                             uploadStatus === "success" ? "text-green-600" : ""}>
                3. Save
              </span>
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
          className={`cursor-pointer flex justify-center items-center border rounded-md px-3 py-3 transition ${
            watchedThumbnail?.[0]
              ? "border-green-400 bg-green-50"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {watchedThumbnail?.[0] ? (
            <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
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
          )}
          <input
            {...register("thumbnail", { required: true })}
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
          />
        </label>
        {errors.thumbnail && <p className="text-red-500 text-sm mt-1">Thumbnail required</p>}

        {watchedThumbnail && watchedThumbnail[0] && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(watchedThumbnail[0])}
              alt="Thumbnail Preview"
              className="max-w-full h-auto rounded-lg max-h-32 object-cover"
            />
            <p className="text-sm text-gray-600 mt-1">
              {watchedThumbnail[0].name}
            </p>
          </div>
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
              {getStatusText()}
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