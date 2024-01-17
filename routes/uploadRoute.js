import multer from "multer";
import checkAuth from "../utils/checkAuth.js";

export const uploadRoute = (app) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "uploads");
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
      url: `http://localhost:4444/uploads/${req.file.originalname}`,
    });
  });
};
