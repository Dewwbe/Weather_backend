import cron from 'node-cron';
import nodemailer from 'nodemailer';
import axios from 'axios';
import User from './models/User.js';
import { Configuration, OpenAIApi } from 'openai';

// Hardcoded Gmail credentials
const GMAIL_USER = 'dewminichamodya54321@gmail.com'; // Replace with your Gmail address
const GMAIL_PASS = 'egovyegwdlvxoeur';              // Replace with your App Password

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER, // Hardcoded Gmail address
    pass: GMAIL_PASS, // Hardcoded App Password
  },
});

// Configure OpenAI API
const openai = new OpenAIApi(new Configuration({ apiKey: 'your_openai_api_key' })); // Replace with your OpenAI API key

// Schedule the cron job to run every minute (for testing purposes)
cron.schedule('* * * * *', async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      try {
        const { latitude, longitude } = user.location;

        // Fetch weather data from OpenWeatherMap
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=your_openweathermap_api_key&units=metric`
        );
        const weather = weatherResponse.data;

        // Get city name from Google Maps API
        const city = await getCityName(latitude, longitude);

        // Generate AI summary of the weather
        const aiResponse = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Write a short summary about the weather in ${city} with temperature ${weather.main.temp}°C and condition ${weather.weather[0].description}.`,
          max_tokens: 50,
        });

        // Prepare email content
        const mailOptions = {
          from: GMAIL_USER, // Hardcoded Gmail address
          to: user.email,
          subject: `Hourly Weather Report for ${city}`,
          text: `Weather in ${city}: ${weather.weather[0].description}, Temperature: ${weather.main.temp}°C\n\n${aiResponse.data.choices[0].text}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${user.email}`);
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error.message);
      }
    }
    console.log('Weather reports sent successfully.');
  } catch (error) {
    console.error('Error sending weather reports:', error.message);
  }
});

// Function to get city name from coordinates using Google Maps API
async function getCityName(lat, lon) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=your_google_maps_api_key`
    ); // Replace with your Google Maps API key
    const addressComponents = response.data.results[0].address_components;
    const city = addressComponents.find((component) =>
      component.types.includes('locality')
    )?.long_name;
    return city || 'Unknown City';
  } catch (error) {
    console.error('Error fetching city name:', error.message);
    return 'Unknown City';
  }
}