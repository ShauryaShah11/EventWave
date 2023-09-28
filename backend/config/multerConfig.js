import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

export { upload };
