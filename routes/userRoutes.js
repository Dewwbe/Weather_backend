import express from 'express';
import { createUser, updateLocation } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.put('/users/:id/location', updateLocation);

export default router;