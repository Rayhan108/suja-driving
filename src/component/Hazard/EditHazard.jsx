import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { 
  useUpdateHazVedioMutation, 
  useGeneratePresignedUrlMutation 
} from "../../redux/feature/hazard/hazardApi";
import { useState, useEffect } from "react";

const EditHazVedio = ({ refetch, singleData, setEditModalOpen, isEditModalOpen }) => {
  const { id } = useParams();
  const videoId = singleData?._id;
  
  // Video presigned URL states
  const [videoPresignedUrl, setVideoPresignedUrl] = useState("");
  const [videoFileName, setVideoFileName] = useState("");
  const [isVideoUrlReady, setIsVideoUrlReady] = useState(false);
  
  // Thumbnail presigned URL states
  const [thumbnailPresignedUrl, setThumbnailPresignedUrl] = useState("");
  const [thumbnailFileName, setThumbnailFileName] = useState("");
  const [isThumbnailUrlReady, setIsThumbnailUrlReady] = useState(false);
  
  // Upload progress states - Video
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [videoUploadStatus, setVideoUploadStatus] = useState("");
  
  // Upload progress states - Thumbnail
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [thumbnailUploadStatus, setThumbnailUploadStatus] = useState("");

  // Overall submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Video validation error
  const [videoError, setVideoError] = useState("");

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

  // Initialize form with singleData
  useEffect(() => {
    if (singleData) {
      reset({
        hazards: singleData.hazards || [],
      });
    }
  }, [singleData, reset]);

  // Reset states when modal opens or singleData changes
  useEffect(() => {
    if (singleData) {
      setVideoPresignedUrl("");
      setVideoFileName("");
      setIsVideoUrlReady(false);
      setThumbnailPresignedUrl("");
      setThumbnailFileName("");
      setIsThumbnailUrlReady(false);
      setVideoUploadProgress(0);
      setIsVideoUploading(false);
      setVideoUploadStatus("");
      setThumbnailUploadProgress(0);
      setIsThumbnailUploading(false);
      setThumbnailUploadStatus("");
      setVideoError("");
    }
  }, [singleData]);

  // Validate MP4 file
  const validateMP4File = (file) => {
    if (!file) return { isValid: true, error: "" };
    
    const validMimeTypes = ["video/mp4"];
    const isValidMimeType = validMimeTypes.includes(file.type);
    const isValidExtension = file.name.toLowerCase().endsWith(".mp4");

    if (!isValidMimeType || !isValidExtension) {
      return { 
        isValid: false, 
        error: "Only MP4 video files are allowed!" 
      };
    }

    const maxSizeInBytes = 500 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return { 
        isValid: false, 
        error: `File size too large! Maximum allowed is 500MB.` 
      };
    }

    return { isValid: true, error: "" };
  };

  // Generate presigned URL when VIDEO file is selected
  useEffect(() => {
    const generateVideoUrl = async () => {
      if (watchedVideo?.[0]) {
        const file = watchedVideo[0];
        
        // Validate MP4
        const validation = validateMP4File(file);
        if (!validation.isValid) {
          setVideoError(validation.error);
          message.error(validation.error);
          return;
        }
        setVideoError("");

        console.log("Generating presigned URL for video...", file.name);
        
        const payload = {
          fileType: "video/mp4",
          fileCategory: "video"
        };

        try {
          setIsVideoUrlReady(false);
          const presignedRes = await generatePresignedUrl(payload).unwrap();
          console.log("Video presignedRes----->", presignedRes);
          
          setVideoPresignedUrl(presignedRes?.uploadURL);
          setVideoFileName(presignedRes?.fileName);
          setIsVideoUrlReady(true);
          
          message.success("Video ready for upload");
        } catch (error) {
          console.error("Error generating video presigned URL", error);
          message.error("Failed to prepare video upload");
          setIsVideoUrlReady(false);
        }
      } else {
        setVideoPresignedUrl("");
        setVideoFileName("");
        setIsVideoUrlReady(false);
        setVideoError("");
      }
    };

    generateVideoUrl();
  }, [watchedVideo, generatePresignedUrl]);

  // Generate presigned URL when THUMBNAIL file is selected
  useEffect(() => {
    const generateThumbnailUrl = async () => {
      if (watchedThumbnail?.[0]) {
        const file = watchedThumbnail[0];
        const fileType = file.type || "image/jpeg";
        
        console.log("Generating presigned URL for thumbnail...", file.name);
        
        const payload = {
          fileType: fileType,
          fileCategory: "image"
        };

        try {
          setIsThumbnailUrlReady(false);
          const presignedRes = await generatePresignedUrl(payload).unwrap();
          console.log("Thumbnail presignedRes----->", presignedRes);
          
          setThumbnailPresignedUrl(presignedRes?.uploadURL);
          setThumbnailFileName(presignedRes?.fileName);
          setIsThumbnailUrlReady(true);
          
          message.success("Thumbnail ready for upload");
        } catch (error) {
          console.error("Error generating thumbnail presigned URL", error);
          message.error("Failed to prepare thumbnail upload");
          setIsThumbnailUrlReady(false);
        }
      } else {
        setThumbnailPresignedUrl("");
        setThumbnailFileName("");
        setIsThumbnailUrlReady(false);
      }
    };

    generateThumbnailUrl();
  }, [watchedThumbnail, generatePresignedUrl]);

  // Function to upload file with progress tracking
  const uploadFileWithProgress = (uploadUrl, file, contentType, setProgress, setStatus) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      console.log("Starting upload to:", uploadUrl);
      console.log("File:", file.name, "Type:", contentType);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          console.log("Upload progress:", percentComplete + "%");
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        console.log("Upload complete, status:", xhr.status);
        if (xhr.status >= 200 && xhr.status < 300) {
          setStatus("success");
          resolve(xhr.response);
        } else {
          setStatus("error");
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', (e) => {
        console.error("Upload error:", e);
        setStatus("error");
        reject(new Error('Upload failed'));
      });

      xhr.addEventListener('abort', () => {
        console.log("Upload aborted");
        setStatus("error");
        reject(new Error('Upload aborted'));
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.send(file);
    });
  };

  // Get progress bar color based on status
  const getProgressBarColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-600";
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case "success":
        return "Upload Complete!";
      case "error":
        return "Upload Failed!";
      default:
        return "Uploading...";
    }
  };

  const onSubmit = async (formValues) => {
    const video = formValues?.video?.[0];
    const thumbnail = formValues?.thumbnail?.[0];

    // Validate MP4 if video is selected
    if (video) {
      const validation = validateMP4File(video);
      if (!validation.isValid) {
        message.error(validation.error);
        return;
      }

      // Check if presigned URL is ready
      if (!videoPresignedUrl || !isVideoUrlReady) {
        message.error("Please wait, video is being prepared for upload...");
        return;
      }
    }

    // Check if thumbnail presigned URL is ready
    if (thumbnail && (!thumbnailPresignedUrl || !isThumbnailUrlReady)) {
      message.error("Please wait, thumbnail is being prepared for upload...");
      return;
    }

    setIsSubmitting(true);

    // Upload video to S3 if selected
    if (video && videoPresignedUrl) {
      try {
        setIsVideoUploading(true);
        setVideoUploadProgress(0);
        setVideoUploadStatus("uploading");

        console.log("Uploading video to S3...");

        await uploadFileWithProgress(
          videoPresignedUrl, 
          video, 
          'video/mp4',
          setVideoUploadProgress,
          setVideoUploadStatus
        );

        console.log("Video upload succeeded!");
        message.success("Video uploaded successfully!");
      } catch (error) {
        console.error("Video upload failed:", error);
        message.error("Video upload failed: " + error.message);
        setIsVideoUploading(false);
        setIsSubmitting(false);
        setVideoUploadStatus("error");
        return;
      }
    }

    // Upload thumbnail to S3 if selected
    if (thumbnail && thumbnailPresignedUrl) {
      try {
        setIsThumbnailUploading(true);
        setThumbnailUploadProgress(0);
        setThumbnailUploadStatus("uploading");

        const thumbnailType = thumbnail.type || "image/jpeg";

        console.log("Uploading thumbnail to S3...");

        await uploadFileWithProgress(
          thumbnailPresignedUrl, 
          thumbnail, 
          thumbnailType,
          setThumbnailUploadProgress,
          setThumbnailUploadStatus
        );

        console.log("Thumbnail upload succeeded!");
        message.success("Thumbnail uploaded successfully!");
      } catch (error) {
        console.error("Thumbnail upload failed:", error);
        message.error("Thumbnail upload failed: " + error.message);
        setIsThumbnailUploading(false);
        setIsSubmitting(false);
        setThumbnailUploadStatus("error");
        return;
      }
    }

    // Prepare the hazards data array
    const hazardsData = formValues.hazards.map((hazard) => ({
      start: parseFloat(hazard.start),
      end: parseFloat(hazard.end),
    }));

    // Validate hazard data
    const isValid = hazardsData.every(
      (hazard) => !isNaN(hazard.start) && !isNaN(hazard.end)
    );
    if (!isValid) {
      message.error("Start and end times must be valid numbers.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data payload - শুধু fileName পাঠাচ্ছি, presigned URL না!
    const dataPayload = {
      hazardTopic: id,
      hazards: hazardsData,
    };

    // Add video_url only if a new video was uploaded
    if (video && videoFileName) {
      dataPayload.video_url = videoFileName;
      console.log("New video fileName:", videoFileName);
    }

    // Add thumbnail only if a new thumbnail was uploaded
    if (thumbnail && thumbnailFileName) {
      dataPayload.thumbnail = thumbnailFileName;
      console.log("New thumbnail fileName:", thumbnailFileName);
    }

    console.log("Sending payload to API:", dataPayload);

    try {
      const res = await updateHazVedio({ 
        args: dataPayload, 
        id: videoId 
      }).unwrap();
      
      console.log("API Response:", res);
      
      if (res?.success) {
        message.success(res?.message || "Updated successfully!");
        refetch();
        reset();
        setEditModalOpen(false);
      } else {
        message.error(res?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error(error?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      setIsVideoUploading(false);
      setIsThumbnailUploading(false);
    }
  };

  const isUploading = isVideoUploading || isThumbnailUploading || isSubmitting;

  // Check if video is selected but URL not ready
  const isVideoPreparingForUpload = watchedVideo?.[0] && !isVideoUrlReady && !videoError;
  const isThumbnailPreparingForUpload = watchedThumbnail?.[0] && !isThumbnailUrlReady;

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
        <label className="block text-gray-700 font-medium mb-1">
          Hazard Times (Start, End)
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
          onClick={() => append({ start: "", end: "" })}
          className="bg-blue-600 text-white rounded-lg py-2 px-4 mt-2"
        >
          Add More Hazard
        </button>
      </div>

      {/* Video Upload */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Upload Video
          <span className="text-xs text-gray-500 ml-2">(Only .mp4 files allowed)</span>
        </label>
        
        {/* Current Video Preview */}
        {singleData?.video_url && !watchedVideo?.[0] && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Current Video:</span>
            </p>
            <video 
              src={singleData.video_url} 
              controls 
              className="w-full rounded-lg max-h-40"
            />
          </div>
        )}

        <label
          htmlFor="video-upload-edit"
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition ${
            videoError 
              ? "border-red-400 bg-red-50" 
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-10 mb-2 ${videoError ? "text-red-400" : "text-gray-400"}`}
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
            {singleData?.video_url ? "Click to change video" : "Drag & drop or click to upload"}
          </span>
          <span className="text-xs text-gray-400 mt-1">MP4 only (Max: 500MB)</span>
          <input
            type="file"
            id="video-upload-edit"
            accept=".mp4,video/mp4"
            {...register("video")}
            className="hidden"
          />
        </label>

        {/* Video Error */}
        {videoError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">❌ {videoError}</p>
          </div>
        )}

        {/* Video Preparing Status */}
        {isVideoPreparingForUpload && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-yellow-700 text-sm">Preparing video for upload...</p>
            </div>
          </div>
        )}

        {/* Display selected video file name */}
        {watchedVideo?.[0] && !videoError && isVideoUrlReady && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">✓ Video ready for upload</p>
            <div className="text-xs text-gray-600 mt-1">
              <p>📹 {watchedVideo[0].name}</p>
              <p>📦 Size: {(watchedVideo[0].size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
        )}

        {/* Video Progress Bar */}
        {isVideoUploading && (
          <div className="mt-4 space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${
                videoUploadStatus === "success" ? "text-green-600" : 
                videoUploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                🎬 {getStatusText(videoUploadStatus)}
              </span>
              <span className={`text-sm font-bold ${
                videoUploadStatus === "success" ? "text-green-600" : 
                videoUploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                {videoUploadProgress}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${getProgressBarColor(videoUploadStatus)}`}
                style={{ width: `${videoUploadProgress}%` }}
              >
                {videoUploadStatus === "uploading" && (
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                )}
              </div>
            </div>

            <div className="text-xs text-gray-500">
              {videoUploadStatus === "uploading" && videoUploadProgress < 100 && "Uploading video to server..."}
              {videoUploadStatus === "success" && "✓ Video uploaded successfully"}
              {videoUploadStatus === "error" && "✗ Video upload failed"}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Image Upload */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Thumbnail Image
        </label>

        {/* Current Thumbnail Preview */}
        {singleData?.thumbnail && !watchedThumbnail?.[0] && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Current Thumbnail:</span>
            </p>
            <img 
              src={singleData.thumbnail} 
              alt="Current Thumbnail" 
              className="max-w-full h-auto rounded-lg max-h-32"
            />
          </div>
        )}

        <label
          htmlFor="file-upload-edit"
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
          <span className="ml-2 text-gray-600 text-sm">
            {singleData?.thumbnail ? "Click to change thumbnail" : "Upload thumbnail"}
          </span>
          <input
            {...register("thumbnail")}
            id="file-upload-edit"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>

        {/* Thumbnail Preparing Status */}
        {isThumbnailPreparingForUpload && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-yellow-700 text-sm">Preparing thumbnail for upload...</p>
            </div>
          </div>
        )}

        {/* New Thumbnail Preview */}
        {watchedThumbnail?.[0] && isThumbnailUrlReady && (
          <div className="mt-2">
            <p className="text-sm text-green-600 mb-1">
              ✓ New thumbnail ready: {watchedThumbnail[0].name}
            </p>
            <img
              src={URL.createObjectURL(watchedThumbnail[0])}
              alt="Thumbnail Preview"
              className="max-w-full h-auto rounded-lg max-h-32"
            />
          </div>
        )}

        {/* Thumbnail Progress Bar */}
        {isThumbnailUploading && (
          <div className="mt-4 space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${
                thumbnailUploadStatus === "success" ? "text-green-600" : 
                thumbnailUploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                🖼️ {getStatusText(thumbnailUploadStatus)}
              </span>
              <span className={`text-sm font-bold ${
                thumbnailUploadStatus === "success" ? "text-green-600" : 
                thumbnailUploadStatus === "error" ? "text-red-600" : "text-blue-600"
              }`}>
                {thumbnailUploadProgress}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${getProgressBarColor(thumbnailUploadStatus)}`}
                style={{ width: `${thumbnailUploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setEditModalOpen(false)}
          disabled={isUploading}
          className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUploading || videoError || isVideoPreparingForUpload || isThumbnailPreparingForUpload}
          className={`w-full px-4 py-2 rounded-lg shadow-md transition ${
            isUploading || videoError || isVideoPreparingForUpload || isThumbnailPreparingForUpload
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
              {isVideoUploading ? `Video ${videoUploadProgress}%` : 
               isThumbnailUploading ? `Thumbnail ${thumbnailUploadProgress}%` : 
               "Saving..."}
            </span>
          ) : isVideoPreparingForUpload || isThumbnailPreparingForUpload ? (
            "Preparing..."
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditHazVedio;