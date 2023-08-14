import React from 'react';
import ReactPlayer from 'react-player'
function VideoPlayer({ video }) {

console.log(video);
  if (!video) {
    return <div className="video-player">No video selected</div>;
    // console.log('Video URL:', video.url);
  }

  return (
    <div className="video-player">
      <h2>{video.title}</h2>
     {/* <video controls width="100%" height="auto">
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
    */}
       <ReactPlayer url={video.url} controls={true} width="100%" height="auto" />
 
      
    </div>
  );
}

export default VideoPlayer;