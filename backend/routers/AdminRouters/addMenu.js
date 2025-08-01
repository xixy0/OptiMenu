const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../../db"); // Adjust this to your database connection setup

const router = express.Router();

// Multer configuration (directly inside the router file)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the absolute path for 'images' folder to avoid relative path issues
    cb(null, path.join(__dirname, "../images")); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    // Generate a unique name based on timestamp and original file name
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed.")); // Error for unsupported file types
    }
  },
});

// Route to handle file upload and database update
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { id, name, price, category, available, demandScore, description } = req.body;

    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Construct the URL for the uploaded image
    const imageUrl = `/images/${req.file.filename}`; // Relative URL for the image
    const realUrl = `http://localhost:5000${imageUrl}`; // URL for frontend

    // Insert or update menu item in the database
    const query = `
      INSERT INTO menu_items (id, name, price, category, available, demandScore, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      price = VALUES(price),
      category = VALUES(category),
      available = VALUES(available),
      demandScore = VALUES(demandScore),
      image = VALUES(image),
      description = VALUES(description)
    `;

    const values = [id, name, price, category, available, demandScore, realUrl, description];

    // Execute the database query
    await db.execute(query, values);

    // Send success response with the image URL
    res.status(200).json({ message: "Menu item saved successfully", imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save menu item" });
  }
});

module.exports = router;
