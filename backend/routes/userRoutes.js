import express from 'express';
import { register, login ,updateUserRole } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour enregistrer un nouvel utilisateur
router.post('/register', register);
// Route pour se connecter et obtenir un token JWT
router.post('/login', login);
// Mettre a jour le role du user protege avec le middleware
router.put('/updateRole', authMiddleware,updateUserRole);

// route protege avec le middleware
router.get('/profile', authMiddleware, (req, res) => {
 
  res.status(200).json(req.user);
});

export default router;
