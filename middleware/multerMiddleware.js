const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'songs',
    resource_type: 'video', // Cloudinary treats audio as video
    format: async (req, file) => 'mp3', // force format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const audioFilter = (req, file, cb) => {
  const allowedTypes = /mp3|mpeg|wav/;
  const ext = file.originalname.toLowerCase().split('.').pop();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed"), false);
  }
};

const audioUpload = multer({
  storage,
  fileFilter: audioFilter,
});

module.exports = { audioUpload };
