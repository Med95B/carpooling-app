import express from 'express';
import { register, login ,updateUserRole } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour enregistrer un nouvel utilisateur
router.post('/register', register);
// Route pour se connecter et obtenir un token JWT
router.post('/login', login);
// Mettre à jour le rôle de l'utilisateur
router.put('/:userId/updateRole', updateUserRole);

// Exemple de route protégée avec le middleware d'authentification
router.get('/profile', authMiddleware, (req, res) => {
  // req.user contient les informations de l'utilisateur authentifié
  res.status(200).json(req.user);
});

export default router;
