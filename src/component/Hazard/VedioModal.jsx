import React, { useState, useRef, useEffect } from 'react';

// const sampleVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

export default function DangerZoneVideo({singleData,refetch}) {
  console.log("single vedio data--->",singleData);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
const sampleVideoUrl = singleData?.video_url
  const [dangerZones, setDangerZones] = useState([
    { id: 1, time: 54 },
    { id: 2, time: 120 },
    { id: 3, time: 180 },
  ]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0); // For progress bar fill

  useEffect(() => {
    const video = videoRef.current;
    const onLoadedMetadata = () => {
      setVideoDuration(Math.floor(video.duration));
    };
    if (video) {
      video.addEventListener('loadedmetadata', onLoadedMetadata);    
      return () => video.removeEventListener('loadedmetadata', onLoadedMetadata);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setSelectedTime(Math.floor(video.currentTime));
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  const addMore = () => {
    const newId = dangerZones.length + 1;
    const lastTime = dangerZones.length > 0 ? dangerZones[dangerZones.length - 1].time : 0;
    const newTime = Math.min(lastTime + 10, videoDuration);
    setDangerZones([...dangerZones, { id: newId, time: newTime }]);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const seekVideo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
      setSelectedTime(time);
    }
  };

  const handleTimelineClick = (e) => {
    if (!videoDuration) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    let clickedTime = Math.round((clickX / width) * videoDuration);

    // Avoid duplicates
    if (dangerZones.some((dz) => dz.time === clickedTime)) return;

    setDangerZones((prev) => [...prev, { id: prev.length + 1, time: clickedTime }]);
  };

  const FlagIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      stroke="red"
      strokeWidth="2"
      width="20px"
      height="20px"
    >
      <path d="M4 2v20h2v-7h10l-3-5 3-5H6V2z" />
    </svg>
  );

  const progressPercent = videoDuration > 0 ? (selectedTime / videoDuration) * 100 : 0;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <div className="relative w-full h-64 bg-black rounded overflow-hidden mb-4">
        <video
          ref={videoRef}
          src={sampleVideoUrl}
          controls
          className="w-full h-full object-cover"
        />
        {/* Rear mirror */}
        {/* <div className="absolute top-2 left-2 w-24 h-16 border border-gray-300 rounded overflow-hidden">
          <video src={sampleVideoUrl} muted autoPlay loop className="w-full h-full object-cover" />
        </div> */}
        {/* Left mirror */}
        {/* <div className="absolute top-2 right-2 w-24 h-16 border border-gray-300 rounded overflow-hidden">
          <video src={sampleVideoUrl} muted autoPlay loop className="w-full h-full object-cover" />
        </div> */}
        {/* Right mirror */}
        {/* <div className="absolute bottom-2 right-2 w-24 h-16 border border-gray-300 rounded overflow-hidden">
          <video src={sampleVideoUrl} muted autoPlay loop className="w-full h-full object-cover" />
        </div> */}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Danger Zone Time</h2>

        <div className="mb-5 border border-gray-400 p-2 text-center ">
          Full Video Length : {formatTime(videoDuration)} Minute
        </div>

        {/* Timeline bar */}
        <div
          ref={timelineRef}
          onClick={handleTimelineClick}
          className="relative h-6 cursor-pointer"
          title="Click to add danger zone"
        >
          {/* Background track */}
          <div
            className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded"
            style={{ transform: 'translateY(-50%)' }}
          />

          {/* Red progress bar */}
          <div
            className="absolute top-1/2 left-0 h-2 bg-red-600 rounded"
            style={{
              width: `${progressPercent}%`,
              transform: 'translateY(-50%)',
            }}
          />

          {/* Circular handle */}
          <div
            className="absolute top-1/2 bg-gray-400 rounded-full"
            style={{
              left: `${progressPercent}%`,
              width: '14px',
              height: '14px',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              border: '2px solid white',
              boxSizing: 'border-box',
            }}
          />

          {/* Flags */}
          {dangerZones.map(({ id, time }) => {
            const leftPercent = (time / videoDuration) * 100;
            return (
              <div
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
                  seekVideo(time);
                }}
                title={`Danger zone at ${formatTime(time)}`}
                className="absolute -top-1  cursor-pointer"
                style={{
                  left: `${leftPercent}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FlagIcon />
              </div>
            );
          })}
        </div>

        <div className="space-y-1 mt-3 mb-4">
          {dangerZones.map(({ id, time }) => (
            <div key={id} className="border border-gray-300 p-1 text-sm">
              {formatTime(time)} : 00 Second
            </div>
          ))}
        </div>

        <button
          onClick={addMore}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add More
        </button>
      </div>
    </div>
  );
}
