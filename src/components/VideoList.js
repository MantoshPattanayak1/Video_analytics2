import React from 'react';
import VideoCard from './VideoCard';

function VideoList({ videos, onVideoSelect }) {

  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelect={() => onVideoSelect(video)} />
      ))}
    </div>
  );
}

export default VideoList;