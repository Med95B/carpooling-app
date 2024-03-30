import express from 'express';
import { sendInvitation, acceptInvitation, declineInvitation ,getInvitations} from '../controllers/invitationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
// Middleware pour verifier l'authentification
router.use(authMiddleware);


router.post('/invitations/send', sendInvitation);
router.put('/invitations/accept/:id', acceptInvitation);
router.put('/invitations/decline/:id', declineInvitation);
router.get('/invitations', getInvitations);

export default router;
