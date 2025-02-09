const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Get Logged-in User Profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update User Profile (Including Image Upload)
router.put("/me", authMiddleware, upload.single("profileImage"), async (req, res) => {
    try {
      const { name, email } = req.body;
      const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;
  
      const updateData = { name, email };
      if (profileImage) updateData.profileImage = profileImage; // ✅ Save image path
  
      const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
