const express = require("express");
const router = express.Router();
const { generateTouristPlaces, generateHotels } = require("../data/mockData");

function calculateTravelCost(distance) {
  return {
    auto: {
      min: Math.round(distance * 8),
      max: Math.round(distance * 12)
    },
    cab: {
      min: Math.round(distance * 15),
      max: Math.round(distance * 20)
    },
    bus: {
      min: Math.round(distance * 4),
      max: Math.round(distance * 6)
    }
  };
}

router.get("/details", (req, res) => {
  try {
    const { city, hotelId, hotelName, price, rating, distance, nights } = req.query;

    const touristPlaces = generateTouristPlaces(city || "Delhi");

    const placesWithCost = touristPlaces.map(place => ({
      ...place,
      cost: calculateTravelCost(place.distance)
    }));

    const numNights = parseInt(nights) || 1;
    const hotelPrice = parseInt(price) || 0;
    const hotelCost = hotelPrice * numNights;

    const localTravelCost = placesWithCost.reduce((total, place) => {
      return total + place.cost.auto.min;
    }, 0);

    const totalTripCost = hotelCost + localTravelCost;

    res.json({
      hotel: {
        id: hotelId,
        name: hotelName,
        city,
        price: hotelPrice,
        rating: parseFloat(rating) || 0,
        distance: parseFloat(distance) || 0
      },
      touristPlaces: placesWithCost,
      tripCost: {
        hotelCost,
        localTravelCost,
        totalTripCost,
        nights: numNights
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Hotel details failed" });
  }
});

router.get("/popular", (req, res) => {
  try {
    const popularCities = ["Goa", "Jaipur", "Manali", "Rishikesh", "Udaipur"];
    const popular = popularCities.map(city => {
      const hotels = generateHotels(city, 3);
      return {
        city,
        minPrice: Math.min(...hotels.map(h => h.price)),
        emoji: ["🏖️", "🏰", "🏔️", "🌊", "🏯"][popularCities.indexOf(city)]
      };
    });
    res.json({ popular });
  } catch (err) {
    res.status(500).json({ message: "Popular fetch failed" });
  }
});

module.exports = router;