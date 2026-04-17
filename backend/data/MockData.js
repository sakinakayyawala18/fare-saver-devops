const cities = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
  "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Nagpur", "Indore", "Bhopal", "Patna", "Vadodara", "Ludhiana",
  "Agra", "Nashik", "Goa", "Manali", "Rishikesh", "Udaipur",
  "Darjeeling", "Shimla", "Ooty", "Mysore", "Kochi", "Varanasi",
  "Amritsar", "Jodhpur", "Pushkar", "Coorg", "Munnar", "Alleppey"
];

const transportTypes = [
  { type: "Train", names: ["Rajdhani Express", "Shatabdi Express", "Duronto Express", "Garib Rath", "Jan Shatabdi"], class: ["Sleeper", "3AC", "2AC"] },
  { type: "Bus", names: ["VRL Travels", "KSRTC", "RedBus", "SRS Travels", "Orange Travels"], class: ["AC Sleeper", "AC Seater", "Non-AC"] },
  { type: "Flight", names: ["IndiGo", "Air India", "SpiceJet", "GoAir", "Vistara"], class: ["Economy", "Business", "Direct"] }
];

const hotelNames = [
  "Sunset Dorm", "Budget Stay", "Palm View Hostel", "Backpacker Inn",
  "City Lodge", "Heritage Homestay", "Royal Budget Hotel", "Traveler's Rest",
  "Budget Palace", "Green Valley Hotel", "Star Budget Inn", "Comfort Stay",
  "Hill View Hotel", "Lake Side Inn", "Garden Stay", "Metro Budget Hotel",
  "Tourist Paradise", "Wanderer's Inn", "Budget Bliss", "Happy Traveler Hotel"
];

const amenitiesList = [
  ["Free WiFi", "AC Room"],
  ["Free WiFi", "Parking"],
  ["Free WiFi", "AC Room", "Breakfast"],
  ["Free WiFi", "AC Room", "Parking", "Breakfast"],
  ["Free WiFi", "AC Room", "Breakfast", "Housekeeping"],
  ["Free WiFi", "AC Room", "Parking", "Breakfast", "Housekeeping"]
];

const touristAttractions = {
  "Delhi": ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple", "Humayun's Tomb"],
  "Mumbai": ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach", "Siddhivinayak Temple"],
  "Goa": ["Vagator Beach", "Chapora Fort", "Anjuna Beach", "Basilica of Bom Jesus", "Dudhsagar Falls"],
  "Jaipur": ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar", "Nahargarh Fort"],
  "Udaipur": ["Lake Pichola", "City Palace", "Jagdish Temple", "Fateh Sagar Lake", "Saheliyon ki Bari"],
  "Manali": ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "Beas River", "Old Manali"],
  "Rishikesh": ["Laxman Jhula", "Ram Jhula", "Triveni Ghat", "Beatles Ashram", "Rajaji National Park"],
  "Shimla": ["Mall Road", "Christ Church", "Jakhu Temple", "Kufri", "Viceregal Lodge"],
  "Kochi": ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace", "Jewish Synagogue", "Marine Drive"],
  "Varanasi": ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath", "Assi Ghat", "Ramnagar Fort"],
  "Agra": ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh", "Itmad-ud-Daulah"],
  "Amritsar": ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Durgiana Temple", "Gobindgarh Fort"]
};

function getAttractions(city) {
  return touristAttractions[city] || [
    `${city} Main Market`, `${city} Lake`, `${city} Fort`,
    `${city} Temple`, `${city} Gardens`
  ];
}

function generateHotels(city, count = 8) {
  const hotels = [];
  const usedNames = new Set();
  for (let i = 0; i < count; i++) {
    let name;
    do {
      name = hotelNames[Math.floor(Math.random() * hotelNames.length)];
    } while (usedNames.has(name));
    usedNames.add(name);

    const price = Math.floor(Math.random() * 1500) + 299;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const distance = (Math.random() * 5 + 0.3).toFixed(1);

    hotels.push({
      id: `${city}-${i}`,
      name: `${name} ${city}`,
      location: `${city} Center`,
      price,
      rating: parseFloat(rating),
      reviews: Math.floor(Math.random() * 1500) + 100,
      distance: parseFloat(distance),
      amenities: amenitiesList[Math.floor(Math.random() * amenitiesList.length)],
      image: ["🏨", "🏩", "🏪", "🏫", "🏬"][Math.floor(Math.random() * 5)]
    });
  }
  return hotels.sort((a, b) => a.price - b.price);
}

function generateTravelOptions(from, to) {
  const options = [];
  transportTypes.forEach(transport => {
    const name = transport.names[Math.floor(Math.random() * transport.names.length)];
    const cls = transport.class[Math.floor(Math.random() * transport.class.length)];
    let price, duration;

    if (transport.type === "Train") {
      price = Math.floor(Math.random() * 1000) + 299;
      duration = `${Math.floor(Math.random() * 20) + 5}h`;
    } else if (transport.type === "Bus") {
      price = Math.floor(Math.random() * 800) + 399;
      duration = `${Math.floor(Math.random() * 15) + 4}h`;
    } else {
      price = Math.floor(Math.random() * 3000) + 1499;
      duration = `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 59)}m`;
    }

    options.push({ type: transport.type, name, class: cls, price, duration });
  });
  return options.sort((a, b) => a.price - b.price);
}

function generateTouristPlaces(city) {
  const attractions = getAttractions(city);
  return attractions.map(name => ({
    name,
    distance: parseFloat((Math.random() * 8 + 0.2).toFixed(1)),
    time: `${Math.floor(Math.random() * 20) + 2} min`,
    emoji: ["🏛️", "🏖️", "🏰", "⛪", "🌊", "🏔️", "🌿", "🎭"][Math.floor(Math.random() * 8)]
  }));
}

module.exports = { cities, generateHotels, generateTravelOptions, generateTouristPlaces };