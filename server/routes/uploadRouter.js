import path from "path";
import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();

const cloud = cloudinary.v2;
const router = express.Router();

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    // folder: "uploads", // any desirable folder name for your Media Library (uploaded images will be in this folder)
    folder: (req, file) => {
      // console.log(req.params.category);
      // console.log(req.params.subcategory);
      return req.params.category + "/" + req.params.subcategory;
    },
    public_id: (req, file) => `${Date.now()}`,
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(req.file.path);
});

router.post("/delete", (req, res) => {
  const imgId = req.body.imgId;
  cloud.uploader.destroy(imgId, function (error, result) {
    // console.log(result, error);
  });
  // res.send(req.file.path);
});
router.post(
  "/multiple/:category/:subcategory",
  upload.array("images", 5),
  (req, res) => {
    res.send(req.files.map((file) => file.path));
    // console.log(req.files.map((file) => file.path));

    // try {
    //   let pictureFiles = req.files;
    //   console.log(req.files);
    //   //Check if files exist
    //   if (!pictureFiles)
    //     return res.status(400).json({ message: "No picture attached!" });
    //   //map through images and create a promise array using cloudinary upload function
    //   let multiplePicturePromise = pictureFiles.map((picture) =>
    //     cloudinary.v2.uploader.upload(picture.path)
    //   );
    //   // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    //   let imageResponses = async () => {
    //     await Promise.all(multiplePicturePromise);
    //   };
    //   imageResponses();
    //   console.log(imageResponses);
    //   res.status(200).json({ images: imageResponses });
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({
    //     message: err.message,
    //   });
    // }
  }
);

export default router;

// import multer from "multer";
// import express from "express";

// const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

// export default uploadRouter;
