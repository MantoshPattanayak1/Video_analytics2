import React from 'react';

function VideoCard({ video, onSelect }) {

  return (
    <div className="video-card" onClick={onSelect}>
      <img src={video.thumbnail} alt={video.title} />
      <p>{video.title}</p>
    </div>
  );
}

export default VideoCard;