import express from 'express';
import { getWeatherForDay } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/weather', getWeatherForDay);

export default router;