// testCloudinary.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary from your .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async () => {
  try {
    // Path to the test image
    const localFilePath = path.join(__dirname, 'test.jpg');

    console.log("Uploading test image to Cloudinary...");

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    console.log("✅ Upload successful!");
    console.log("Image URL:", result.secure_url);

  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err.message);
  }
})();
