import { cloudinary } from '../config/cloudinary.js';

const uploadFiles = async (req, res, next) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: 'No file attached to the request',
      });
    }    

    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'event-management/image',
        public_id: `${Date.now()}-${file.originalname}`,
        resource_type: "auto"
      })
    );

    const results = await Promise.all(uploadPromises);

    req.fileUrls = results.map(result => result.secure_url);
    next();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
  }
};

export { uploadFiles };