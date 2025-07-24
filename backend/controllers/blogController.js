const Blog = require('../models/blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newBlog = new Blog({ title, image, description });
    await newBlog.save();

    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error while creating blog' });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching blogs' });
  }
};

// Edit Blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true } // return updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating blog' });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error deleting blog' });
  }
};


// Get a single blog by ID
exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching blog' });
  }
};
