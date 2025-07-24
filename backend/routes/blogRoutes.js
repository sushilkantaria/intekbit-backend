const express = require('express');
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog   
} = require('../controllers/blogController');

const router = express.Router();

router.post('/addblogs', createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blog/:id', getSingleBlog); // ✅ Add this line
router.put('/blog/:id', updateBlog);      // 🛠 Edit
router.delete('/blog/:id', deleteBlog);   // ❌ Delete

module.exports = router;
