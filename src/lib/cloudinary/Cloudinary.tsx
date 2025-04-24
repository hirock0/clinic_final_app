import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDUDINARY_API_SECRET,
});
export const UploadToCloudinary = async (img: string,folder:string) => {
  try {
    const result = await cloudinary.uploader.upload(img, {
      folder: folder,
    });
    return result;
  } catch (error) {
    throw new Error(String(error));
  }
};
