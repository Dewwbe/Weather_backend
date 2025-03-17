import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import { getCityFromCoordinates } from './utils/geocoding.js';
import weatherRoutes from './routes/weatherRoutes.js'

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );



app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});



app.use('/api', userRoutes);
app.use('/api', weatherRoutes);
// Temporary route to test getCityFromCoordinates
app.get('/test-city', async (req, res) => {
  try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
          return res.status(400).json({ message: 'Latitude and longitude are required.' });
      }

      const cityName = await getCityFromCoordinates(latitude, longitude);
      res.status(200).json({ message: 'City retrieved successfully', city: cityName });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching city name', error: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  