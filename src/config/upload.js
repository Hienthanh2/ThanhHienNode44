import multer, { diskStorage } from "multer";

// process.cwd(): tra ve duong dan root cua project
export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => {
      // timestamp_imageName
      console.log("FILE!: ", file);
      const newName = new Date().getTime() + "_" + file.originalname;

      // Like next() of controller
      callback(null, newName);
    },
  }),
});
