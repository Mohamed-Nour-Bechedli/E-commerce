const cloudinary = require('../config/cloudinary');

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Extract the public ID from the Cloudinary URL
    const parts = imageUrl.split('/');
    const filename = parts.pop().split('.')[0];
    const folderIndex = parts.indexOf('upload') + 1;
    const folder = parts.slice(folderIndex).join('/');
    const publicId = `${folder}/${filename}`;

    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted Cloudinary image: ${publicId}`);
  } catch (error) {
    console.error('Cloudinary deletion failed:', error.message);
  }
};

module.exports = deleteFromCloudinary;
