import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from "fs";

cloudinary.config({
  cloud_name: "dtus63jgy",
  api_key: "861769279972162",
  api_secret: "HVv9iP45DQYv43fU04FNhHK6lq0",
});
export const uploadOnCloudinary = async (filePath) => {
  try {
    const response = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new ApiError(500, "Cloudinary upload error", error);
  }
};

export const deleteImageFromCloudinary = async (publicUrl) => {
  await cloudinary.uploader
    .destroy(publicUrl)
    .then((result) => console.log(result));
};
