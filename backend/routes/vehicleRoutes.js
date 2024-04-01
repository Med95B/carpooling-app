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
import uploadVehicle from '../middlewares/uploadVehicleMiddleware.js';

const router = express.Router();

// Créer un nouveau véhicule
router.post('/vehicles', authMiddleware,upload.fields([
  { name: 'driverLicenseImage', maxCount: 1 },
  { name: 'vehicleRegistrationImage', maxCount: 1 },
  { name: 'vehicleInsuranceImage', maxCount: 1 },
  { name: 'vehicleImage', maxCount: 1 }
]) ,createVehicle);

// Obtenir tous les véhicules d'un user
router.get('/user/vehicles', authMiddleware, getUserVehicles);

// Obtenir tous les véhicules de la base de données
router.get('/vehicles', authMiddleware, getAllVehicles);

// Obtenir un véhicule par ID
router.get('/vehicles/:id', authMiddleware, getVehicleById);

// Mettre à jour un véhicule par ID
router.put('/:id', authMiddleware,uploadVehicle.fields([
  { name: 'driverLicenseImage', maxCount: 1 },
  { name: 'vehicleRegistrationImage', maxCount: 1 },
  { name: 'vehicleInsuranceImage', maxCount: 1 },
  { name: 'vehicleImage', maxCount: 1 }
]),updateVehicleById);

// Supprimer un véhicule par ID
router.delete('/vehicles/:id', authMiddleware, deleteVehicleById);


export default router;
