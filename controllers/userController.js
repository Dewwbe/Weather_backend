import User from '../models/User.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Store user details
export const createUser = async (req, res) => {
  try {
    const { name, email, latitude, longitude } = req.body;
    const user = new User({ name, email, location: { latitude, longitude } });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user location
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { location: { latitude, longitude } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'Location updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};