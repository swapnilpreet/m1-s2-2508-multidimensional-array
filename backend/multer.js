const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

// File filter (optional - only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;



const express = require("express");
const mongoose = require("mongoose");
const upload = require("./upload");
const app = express();

// Schema model
const FileSchema = new mongoose.Schema({
  filename: String,
  filepath: String
});
const FileModel = mongoose.model("File", FileSchema);

// Upload route 
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileDoc = new FileModel({
      filename: req.file.filename,
      filepath: req.file.path
    });
    await fileDoc.save();

    res.json({ message: "File uploaded successfully", file: fileDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

