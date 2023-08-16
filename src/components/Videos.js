import React from 'react';
import VideoList from './VideoList';
import ProcessedVideos from'./ProcessedVideos'
function Videos(props){
    return(
    <div className='videos'>
        <ProcessedVideos/>
         <VideoList videos={props.videos} onVideoSelect={props.onVideoSelect} />
    </div>
    )
}
export default Videos