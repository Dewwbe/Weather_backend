import axios from 'axios';
import User from '../models/User.js';
import WeatherData from '../models/WeatherData.js';
import dotenv from 'dotenv';

dotenv.config();

// Fetch weather data for a given day
export const getWeatherForDay = async (req, res) => {
  try {
    const { userId, date } = req.query;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { latitude, longitude } = user.location;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${Math.floor(new Date(date).getTime() / 1000)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weather = response.data.current;
    const city = await getCityName(latitude, longitude);

    const weatherData = new WeatherData({
      userId,
      date,
      temperature: weather.temp,
      description: weather.weather[0].description,
      city,
    });
    await weatherData.save();

    res.status(200).json({ message: 'Weather data fetched successfully', weatherData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get city name from coordinates using Google Cloud
async function getCityName(lat, lon) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  const addressComponents = response.data.results[0].address_components;
  const city = addressComponents.find((component) =>
    component.types.includes('locality')
  )?.long_name;
  return city || 'Unknown City';
}