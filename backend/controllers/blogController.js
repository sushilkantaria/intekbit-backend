// const Blog = require('../models/blog');

// // Create a new blog
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, image, description } = req.body;

//     if (!title || !image || !description) {
//       return res.status(400).json({ success: false, message: 'All fields are required' });
//     }

//     const newBlog = new Blog({ title, image, description });
//     await newBlog.save();

//     res.status(201).json({ success: true, blog: newBlog });
//   } catch (err) { 
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error while creating blog' });
//   }
// };

// // Get all blogs
// exports.getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json({ success: true, blogs });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching blogs' });
//   }
// };

// // Edit Blog
// exports.updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, image, description } = req.body;

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { title, image, description },
//       { new: true } // return updated document
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     res.json({ success: true, blog: updatedBlog });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Error updating blog' });
//   }
// };

// // Delete Blog
// exports.deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedBlog = await Blog.findByIdAndDelete(id);

//     if (!deletedBlog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     res.json({ success: true, message: 'Blog deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Error deleting blog' });
//   }
// };


// // Get a single blog by ID
// exports.getSingleBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     res.status(200).json({ success: true, blog });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Error fetching blog' });
//   }
// };








// controllers/blogController.js
const fs = require('fs');
const path = require('path');
const Blog = require('../models/blog');

// ---- SAME uploads dir ----
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', 'uploads');

// SAFE file remove helper
const removeFileIfExists = (fileUrlLike) => {
  try {
    if (!fileUrlLike) return;
    const filename = path.basename(fileUrlLike); // handle /uploads/xyz or full URL
    const diskPath = path.join(UPLOADS_DIR, filename);
    fs.unlink(diskPath, (err) => {
      if (err) console.warn('File remove warning:', diskPath, err.message);
    });
  } catch (e) {
    console.warn('removeFileIfExists error:', e.message);
  }
};

// Create
exports.createBlog = async (req, res) => {
  try {
    // 🔍 debug logs (check in Render logs)
    console.log('CREATE req.headers[content-type]:', req.headers['content-type']);
    console.log('CREATE req.file:', req.file);
    console.log('CREATE req.body:', req.body);

    const { title, description } = req.body;
    if (!title || !description || !req.file) {
      return res.status(400).json({ success: false, message: 'Title, description, and image are required' });
    }

    const image = `/uploads/${req.file.filename}`;
    const newBlog = new Blog({ title, image, description });
    await newBlog.save();

    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    console.error('CREATE_BLOG_ERROR:', err?.stack || err);
    res.status(500).json({ success: false, message: 'Server error while creating blog' });
  }
};

// Get all
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching blogs' });
  }
};

// Get one
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error('GET_SINGLE_ERROR:', err?.stack || err);
    res.status(500).json({ success: false, message: 'Error fetching blog' });
  }
};

// Update
exports.updateBlog = async (req, res) => {
  try {
    console.log('UPDATE req.file:', req.file);
    const { id } = req.params;
    const { title, description } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    let image = blog.image;
    if (req.file) {
      removeFileIfExists(blog.image);
      image = `/uploads/${req.file.filename}`;
    }

    blog.title = title ?? blog.title;
    blog.description = description ?? blog.description;
    blog.image = image;

    const updatedBlog = await blog.save();
    res.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error('UPDATE_BLOG_ERROR:', err?.stack || err);
    res.status(500).json({ success: false, message: 'Error updating blog' });
  }
};

// Delete
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });

    removeFileIfExists(deletedBlog.image);
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('DELETE_BLOG_ERROR:', err?.stack || err);
    res.status(500).json({ success: false, message: 'Error deleting blog' });
  }
};
