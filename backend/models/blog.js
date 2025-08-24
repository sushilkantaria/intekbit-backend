// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//   title: String,
//   image: String, // base64 string
//   description: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Blog', blogSchema);
 


const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // will store '/uploads/filename.ext'
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);
