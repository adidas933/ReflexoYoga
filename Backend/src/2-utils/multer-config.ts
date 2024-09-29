// multer-config.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const ensureUploadsDir = () => {
  const dir = 'uploads/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

ensureUploadsDir();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: Number(process.env.FILE_SIZE_LIMIT) || 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File type not supported!'));
  }
});

export default upload;
