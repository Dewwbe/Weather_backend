import mongoose from 'mongoose';

const weatherDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
});

export default mongoose.model('WeatherData', weatherDataSchema);