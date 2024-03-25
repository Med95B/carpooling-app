import express from 'express';
import {
  createVehicle,
  getUserVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById,
  getAllVehicles
} from '../controllers/vehicleController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Créer un nouveau véhicule
router.post('/vehicles', authMiddleware, createVehicle);

// Obtenir tous les véhicules d'un user
router.get('/user/vehicles', authMiddleware, getUserVehicles);

// Obtenir tous les véhicules de la base de données
router.get('/vehicles', authMiddleware, getAllVehicles);

// Obtenir un véhicule par ID
router.get('/vehicles/:id', authMiddleware, getVehicleById);

// Mettre à jour un véhicule par ID
router.put('/:id', authMiddleware,updateVehicleById);

// Supprimer un véhicule par ID
router.delete('/vehicles/:id', authMiddleware, deleteVehicleById);


export default router;
