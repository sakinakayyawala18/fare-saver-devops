const express = require("express");
const router = express.Router();
const { generateTravelOptions, generateHotels, cities } = require("../data/mockData");

router.get("/cities", (req, res) => {
  res.json({ cities });
});

router.get("/results", (req, res) => {
  try {
    const { from, to, date } = req.query;
    if (!from || !to) {
      return res.status(400).json({ message: "From and To cities required" });
    }

    const travelOptions = generateTravelOptions(from, to);
    const hotels = generateHotels(to, 10);

    res.json({
      from,
      to,
      date,
      travelOptions,
      hotels
    });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

router.get("/hotels", (req, res) => {
  try {
    const { city, minPrice, maxPrice, minRating, maxDistance, sort } = req.query;
    let hotels = generateHotels(city || "Delhi", 10);

    if (minPrice) hotels = hotels.filter(h => h.price >= parseInt(minPrice));
    if (maxPrice) hotels = hotels.filter(h => h.price <= parseInt(maxPrice));
    if (minRating) hotels = hotels.filter(h => h.rating >= parseFloat(minRating));
    if (maxDistance) hotels = hotels.filter(h => h.distance <= parseFloat(maxDistance));

    if (sort === "price_asc") hotels.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") hotels.sort((a, b) => b.price - a.price);
    else if (sort === "rating") hotels.sort((a, b) => b.rating - a.rating);

    res.json({ hotels });
  } catch (err) {
    res.status(500).json({ message: "Hotel search failed" });
  }
});

module.exports = router;