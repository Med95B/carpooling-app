import express from 'express';
import { createRide, getAllRides, getRideById, deleteRideById } from '../controllers/rideController.js';

const router = express.Router();

// Créer un nouveau trajet
router.post('/rides', createRide);

// Obtenir tous les trajets
router.get('/rides', getAllRides);

// Obtenir un trajet par ID
router.get('/rides/:id', getRideById);

// Supprimer un trajet par ID
router.delete('/rides/:id', deleteRideById);

export default router;
