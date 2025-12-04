import React, { useState, useRef, useEffect } from "react";

export default function DangerZoneVideo({ vedioData }) {
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const sampleVideoUrl = vedioData?.video_url;

  const [videoDuration, setVideoDuration] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const onLoadedMetadata = () => {
      setVideoDuration(Math.floor(video.duration));
    };
    if (video) {
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      return () =>
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setSelectedTime(Math.floor(video.currentTime));
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const seekVideo = (e) => {
    if (!timelineRef.current || !videoRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * videoDuration;

    videoRef.current.currentTime = time;
    setSelectedTime(time);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const FlagIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
      width="20px"
      height="20px"
    >
      <path d="M4 2v20h2v-7h10l-3-5 3-5H6V2z" />
    </svg>
  );

  const progressPercent = videoDuration > 0 ? (selectedTime / videoDuration) * 100 : 0;

  const renderHazardTimes = () => {
    if (vedioData?.hazards?.length > 0) {
      return vedioData.hazards.map((hazard, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gradient-to-r from-red-50 to-red-100 p-3 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="bg-red-500 p-1 rounded mr-2">
              <FlagIcon />
            </div>
            <span className="text-gray-800 font-semibold">Hazard {index + 1}</span>
          </div>
          <div className="flex space-x-4">
            <div className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
              <strong>Start:</strong> {formatTime(hazard.start)}
            </div>
            <div className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
              <strong>End:</strong> {formatTime(hazard.end)}
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
        No hazards detected
      </div>
    );
  };

  // Render hazard markers on timeline
  const renderHazardMarkers = () => {
    if (!vedioData?.hazards?.length) return null;

    return vedioData.hazards.map((hazard, index) => {
      const startPercent = (hazard.start / 1000 / videoDuration) * 100;
      const endPercent = (hazard.end / 1000 / videoDuration) * 100;

      return (
        <React.Fragment key={index}>
          <div
            className="absolute top-0 h-6 bg-red-500 opacity-30 rounded-l"
            style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
          />
          <div
            className="absolute top-0 w-1 h-6 bg-red-500"
            style={{ left: `${startPercent}%` }}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      {/* Video Player */}
      <div className="relative w-full rounded-lg overflow-hidden shadow-xl mb-6">
        <video
          ref={videoRef}
          src={sampleVideoUrl}
          className="w-full h-64 object-cover"
          poster={vedioData?.thumbnail_url}
        />

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-red-400 transition-colors"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            <div className="text-white text-sm font-mono">
              {formatTime(selectedTime * 1000)} / {formatTime(videoDuration * 1000)}
            </div>

            <div className="flex-1">
              <div
                ref={timelineRef}
                onClick={seekVideo}
                className="relative h-1.5 cursor-pointer rounded-full bg-gray-600"
              >
                {/* Progress bar */}
                <div
                  className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />

                {/* Hazard markers */}
                {renderHazardMarkers()}

                {/* Thumb */}
                <div
                  className="absolute top-1/2 bg-white rounded-full shadow"
                  style={{
                    left: `${progressPercent}%`,
                    width: "12px",
                    height: "12px",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => videoRef.current?.requestFullscreen()}
              className="text-white hover:text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hazard Information */}
      <div className="bg-white rounded-lg p-5 shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-red-500 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Hazard Zones</h3>
        </div>

        <div className="space-y-3">
          {renderHazardTimes()}
        </div>
      </div>
    </div>
  );
}