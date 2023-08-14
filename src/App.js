import React, { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import VideoUploader from './components/VideoUploader';
import './App.css';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  useEffect(() => {
    // Fetch uploaded videos from the backend
    fetch('http://localhost:3001/backend/videos') 
      .then((response) => response.json())
      .then((data) => setUploadedVideos(data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleVideoUpload = (video) => {
    // Add the uploaded video to the state
    setUploadedVideos((prevVideos) => [...prevVideos, video]);
  };

  return (
    <div className="app">
      <VideoList videos={uploadedVideos} onVideoSelect={handleVideoSelect} />
      <VideoPlayer video={selectedVideo} />
      <VideoUploader onUpload={handleVideoUpload} />
    </div>
  );
}

export default App;
