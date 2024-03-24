import express from 'express';
import { createRide, getAllRides, getRideById, deleteRideById,getUserRides } from '../controllers/rideController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Créer un nouveau trajet
router.post('/rides',authMiddleware ,createRide);

// Obtenir tous les trajets
router.get('/rides',authMiddleware ,getAllRides);

// Obtenir un trajet par ID
router.get('/rides/:id',authMiddleware ,getRideById);

// Obtenir les trajets d'un user
router.get('/user/rides', authMiddleware, getUserRides);

// Supprimer un trajet par ID
router.delete('/rides/:id',authMiddleware ,deleteRideById);


export default router;
