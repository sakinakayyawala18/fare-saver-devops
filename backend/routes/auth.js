const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wishlist: [Object],
  recentlyViewed: [Object],
  savedTrips: [Object]
});

const User = mongoose.model("User", UserSchema);

const JWT_SECRET = "faresaver_secret_key";

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/wishlist", async (req, res) => {
  try {
    const { userId, hotel } = req.body;
    const user = await User.findById(userId);
    const exists = user.wishlist.find(h => h.id === hotel.id);
    if (exists) {
      user.wishlist = user.wishlist.filter(h => h.id !== hotel.id);
    } else {
      user.wishlist.push(hotel);
    }
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: "Wishlist update failed" });
  }
});

router.post("/recently-viewed", async (req, res) => {
  try {
    const { userId, hotel } = req.body;
    const user = await User.findById(userId);
    user.recentlyViewed = user.recentlyViewed.filter(h => h.id !== hotel.id);
    user.recentlyViewed.unshift(hotel);
    if (user.recentlyViewed.length > 5) user.recentlyViewed.pop();
    await user.save();
    res.json({ recentlyViewed: user.recentlyViewed });
  } catch (err) {
    res.status(500).json({ message: "Recently viewed update failed" });
  }
});

router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({
      name: user.name,
      email: user.email,
      wishlist: user.wishlist,
      recentlyViewed: user.recentlyViewed,
      savedTrips: user.savedTrips
    });
  } catch (err) {
    res.status(500).json({ message: "Profile fetch failed" });
  }
});

module.exports = router;