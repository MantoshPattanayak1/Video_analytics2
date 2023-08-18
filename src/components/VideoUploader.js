// import React, { useState } from 'react';

// function VideoUploader({ onUpload }) {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     try {
//       // Simulate a network request delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Create a video object using the selected file
//       const video = {
//         id: new Date().getTime(), // Generate a unique ID
//         title: selectedFile.name,
//         // You might need to implement actual file uploading logic here
//         // and set the appropriate URL or path for the video
//         videoUrl: URL.createObjectURL(selectedFile),
//         thumbnail: 'thumbnail_url_for_uploaded_video',
//       };

//       onUpload(video);
//       setSelectedFile(null);
//     } catch (error) {
//       console.error('Error uploading video:', error);
//     }
//   };

//   return (
//     <div className="video-uploader">
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!selectedFile}>
//         Upload
//       </button>
//     </div>
//   );
// }


// export default VideoUploader;

import React, { useState } from 'react';

function VideoUploader({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('fire'); 

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile|| !selectedCategory) return;

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('category', selectedCategory);
        const response = await fetch('http://localhost:3001/backend/upload', {
          method: 'POST',
          body: formData,
        });
      
        console.log('Response status:', response.status);
      
        if (response.ok) {
          
          const videoData = await response.json();
          // console.log(videoData,'kdshfvksdhfkvshkf')
          // // videoData.thumbnail = `${videoData.thumbnailUrl}`; // Adjust the file extension if needed

          videoData.title = videoData.filename; // Set the title based on the filename
          // videoData.thumbnail = '/path/to/thumbnail';
          onUpload(videoData);
          console.log('Uploaded Video Data:', videoData);
          setSelectedFile(null);
        } else {
          console.error('Failed to upload video');
        }
     
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="video-uploader">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="fire">Fire</option>
        <option value="crowd">Crowd</option>
        <option value="wrong_parking">Wrong Parking</option>
      </select>
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
}

export default VideoUploader;