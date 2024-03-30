import Invitation from '../models/Invitation.js';
import User from '../models/User.js';

// Récupérer les invitations (envoyées et reçues) par un utilisateur
export const getInvitations = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const invitations = await Invitation.find({
        $or: [
          { recipient: userId },
          { sender: userId }
        ]
      }).populate('sender')
        .populate('recipient')
        .populate('trip');
  
      res.status(200).json(invitations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Envoyer une invitation
export const sendInvitation = async (req, res) => {
  const { recipientId, tripId } = req.body;
  const senderId = req.user._id;

  try {
    // Vérifier si l'utilisateur destinataire existe
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    // Créer une nouvelle invitation
    const invitation = new Invitation({
      sender: senderId,
      recipient: recipientId,
      tripId: tripId,
    });
    await invitation.save();

    res.status(200).json({ message: 'Invitation sent successfully', invitation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accepter une invitation
export const acceptInvitation = async (req, res) => {
  const invitationId = req.params.id;
  const userId = req.user._id;

  try {
    // Vérifier si l'invitation existe
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    // Vérifier si l'utilisateur est le destinataire de l'invitation
    if (invitation.recipient.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to accept this invitation' });
    }

    // Mettre à jour le statut de l'invitation
    invitation.status = 'accepted';
    await invitation.save();

    res.status(200).json({ message: 'Invitation accepted successfully', invitation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refuser une invitation
export const declineInvitation = async (req, res) => {
  const invitationId = req.params.id;
  const userId = req.user._id;

  try {
    // Vérifier si l'invitation existe
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    // Vérifier si l'utilisateur est le destinataire de l'invitation
    if (invitation.recipient.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to decline this invitation' });
    }

    // Mettre à jour le statut de l'invitation
    invitation.status = 'declined';
    await invitation.save();

    res.status(200).json({ message: 'Invitation declined successfully', invitation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


