import express from 'express';
import { register, login ,updateUserRole,updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadProfile from '../middlewares/uploadProfileMiddleware.js';

const router = express.Router();

// Route pour enregistrer un nouvel utilisateur
router.post('/register', register);
// Route pour se connecter et obtenir un token JWT
router.post('/login', login);
// Mettre a jour le role du user protege avec le middleware
router.put('/updateRole', authMiddleware,updateUserRole);
// update profile
router.put('/updateProfile',authMiddleware,uploadProfile.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'idCard', maxCount: 1 }
]),updateProfile)
// route protege avec le middleware
router.get('/profile', authMiddleware, (req, res) => {
 
  res.status(200).json(req.user);
});

export default router;
