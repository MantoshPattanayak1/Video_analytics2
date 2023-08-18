const fs = require('fs');
const path = require('path');

const filePathtxt = path.join(__dirname, 'filePaths.txt');

// console.log('Reading file from:', filePath);
const uploadDirectory = path.join(__dirname, 'uploads');



function storeFilePath(filePath,category) {
  // Read the existing contents of the text file
  let existingContents = '';
  try {
    existingContents = fs.readFileSync(filePathtxt, 'utf-8');
  } catch (error) {
    console.error('Error reading file:', error);
  }

  // Split the contents into an array of lines
  const lines = existingContents.trim().split('\n');

  // Replace the last line with the current file path
  lines[lines.length - 1] = `${filePath},${category}`;  // Write the updated contents back to the file
  try {
    fs.writeFileSync(filePathtxt, lines.join('\n'), 'utf-8');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}





module.exports = {
  storeFilePath,
};
