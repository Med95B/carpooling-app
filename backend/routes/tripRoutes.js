import express from 'express';
const router = express.Router();
import { searchTripsByCriteria ,createTrip, getAllTrips, getTripById, deleteTripById } from '../controllers/tripController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// Middleware pour verifier l'authentification
router.use(authMiddleware);

// recherche de trips par critères
router.post('/trips/search', searchTripsByCriteria);

//  creer un nouveau trip
router.post('/trips', createTrip);

// obtenir tous les trips
router.get('/trips', getAllTrips);

//  obtenir un trip par ID
router.get('/trips/:id', getTripById);

//  supprimer un trip par ID
router.delete('/trips/:id', deleteTripById);

export default router;
