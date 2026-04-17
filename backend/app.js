const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

mongoose.connect("mongodb://localhost:27017/faresaver")
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("MongoDB Error:", err));

const authRoutes = require("./routes/auth");
const searchRoutes = require("./routes/search");
const hotelRoutes = require("./routes/hotels");

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/hotels", hotelRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));