import express from 'express';
import {
  createVehicle,
  getUserVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
} from '../controllers/vehicleController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Créer un nouveau véhicule
router.post('/vehicles', authMiddleware, createVehicle);

// Obtenir tous les véhicules user
router.get('/vehicles', authMiddleware, getUserVehicles);

// Obtenir un véhicule par ID
router.get('/vehicles/:id', authMiddleware, getVehicleById);

// Mettre à jour un véhicule par ID
router.put('/:id', authMiddleware,updateVehicleById);

// Supprimer un véhicule par ID
router.delete('/vehicles/:id', authMiddleware, deleteVehicleById);

export default router;
