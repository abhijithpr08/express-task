import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(201).json({
    message: "Upload success",
    file: req.file.filename
  });
});

export default router;
