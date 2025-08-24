// const express = require('express');
// const {
//   createBlog,
//   getAllBlogs,
//   updateBlog,
//   deleteBlog,
//   getSingleBlog   
// } = require('../controllers/blogController');

// const router = express.Router();

// router.post('/addblogs', createBlog);
// router.get('/blogs', getAllBlogs);
// router.get('/blog/:id', getSingleBlog); // ✅ Add this line
// router.put('/blog/:id', updateBlog);      // 🛠 Edit
// router.delete('/blog/:id', deleteBlog);   // ❌ Delete

// module.exports = router; 






// routes/blogRoutes.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog
} = require('../controllers/blogController');

const router = express.Router();

// ---- SAME uploads dir as server.js ----
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const safe = (file.originalname || 'image').replace(/\s+/g, '_');
    cb(null, Date.now() + '_' + safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// 🔒 Wrap multer to surface its errors to our global handler
const uploadSingleImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return next(err); // MulterError or others -> GLOBAL ERROR
    next();
  });
};

// Routes
router.post('/addblogs', uploadSingleImage, createBlog);
router.put('/blog/:id', uploadSingleImage, updateBlog);
router.delete('/blog/:id', deleteBlog);
router.get('/blog/:id', getSingleBlog);
router.get('/blogs', getAllBlogs);

module.exports = router;
