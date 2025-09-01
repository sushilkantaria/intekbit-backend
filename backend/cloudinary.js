// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');


// cloudinary.config({ 
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
// 	api_key: process.env.CLOUDINARY_API_KEY, 
// 	api_secret: process.env.CLOUDINARY_API_SECRET 
// });


// // const uploadOnCloudinary = async (localFilePath) => {
// // 	try {
// // 		if (!localFilePath) return null;
// // 		// Upload the file on cloudinary
// // 		const response = await cloudinary.uploader.upload(localFilePath, {
// // 			resource_type: "auto"
// // 		});
// // 		// File has been uploaded successfully
// // 		fs.unlinkSync(localFilePath);
// // 		return response;
// // 	} catch (error) {
// // 		if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
// // 		return null;
// // 	}
// // }


// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto"
//     });

//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     console.error("Cloudinary upload failed:", error); // 🔥 log it!
//     if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
//     return null;
//   }
// };



// module.exports = { uploadOnCloudinary };












const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(localFilePath); // remove local file after upload
    return response;

  } catch (error) {
    console.error("Cloudinary upload failed:", error); // 🔥 log the real error
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); // remove local file anyway
    return null;
  }
}

module.exports = { uploadOnCloudinary };
