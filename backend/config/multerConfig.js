import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises'; // Import the 'fs' module with promises support

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../uploads/")); // Use an absolute path with join
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames
  },
});

const upload = multer({
  storage: storage,
  // You can add other configuration options as needed
});

const uploadFolder = join(__dirname, '../uploads/'); // Define the upload folder path

const deleteOldImages = async (oldImagePaths) => {
  try {
    // Iterate through the array of old image file names
    for (const fileName of oldImagePaths) {
      const filePath = join(uploadFolder, fileName);
      await fs.unlink(filePath); // Delete the file
    }
    console.log('Old images deleted successfully.');
  } catch (error) {
    console.error('Error deleting old images:', error);
  }
};

export { upload, deleteOldImages };
