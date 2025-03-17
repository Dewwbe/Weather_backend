import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

export default mongoose.model('User', userSchema);