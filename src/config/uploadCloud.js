import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// config multer to store file into cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatar", // define folder on cloudinary
    format: (req, file) => {
      const validImgFormat = ["png", "jpeg", "gif", "webp", "heic"];
      // abc.jpg -> get file extension
      // mimetype: image/jpeg
      const fileFormat = file.mimetype.split("/")[1];

      // check if file extension is valid
      if (validImgFormat.includes(fileFormat)) {
        return fileFormat;
      }

      return "png";
    },
    transformation: [
      {
        width: 800,
        quality: "auto:good", // compress with good quality
        fetch_format: "auto", // automatically use for best format (webp, png,...)
      },
    ],
    public_id: (req, file) => file.originalname.split(".")[0], // define image name
  },
});

// initial multer integrate with cloudinary storage
export const uploadCloud = multer({ storage });
