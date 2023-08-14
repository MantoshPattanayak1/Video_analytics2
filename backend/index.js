const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add this import for the File System module
const app = express();
const cors = require('cors'); // Add this import for the CORS module
const port = 3001; // Change this to your desired port

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadsDirectory = path.join(__dirname, 'uploads');

const upload = multer({ storage });

// Serve uploaded files from the 'uploads' directory
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(__dirname)
// Handle file upload
app.post('/backend/upload', upload.single('file'), (req, res) => {
    console.log('File received:', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Construct the response with uploaded file details
  const uploadedFile = {
    id: Date.now(),
    originalname: req.file.originalname,
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    thumbnailUrl: `/uploads/${req.file.filename}`, // Replace with actual thumbnail URL
  };

  res.status(200).json(uploadedFile);
});

// Define a route to retrieve the list of videos
app.get('/backend/videos', (req, res) => {
  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const videos = files.map((file) => {
      return {
        id: file,
        title: file,
        url: `/uploads/${file}`,
        thumbnailUrl: `/uploads/${file}`, // Replace with actual thumbnail URL
      };
    });

    res.json(videos);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});