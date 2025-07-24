const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String, // base64 string
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
