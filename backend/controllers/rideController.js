import Ride from '../models/Ride.js';

// Créer un nouveau trajet
export const createRide = async (req, res) => {
  const { departure, arrival,route } = req.body;
  const user = req.user;
  try {
    const newRide = new Ride({
      user,
      departure,
      arrival,
      route
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir tous les trajets
export const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un trajet par ID
export const getRideById = async (req, res) => {
  const { id } = req.params;

  try {
    const ride = await Ride.findById(id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les trajets d'un utilisateur par son ID
export const getUserRides = async (req, res) => {
  const user = req.user;

  try {
    const userRides = await Ride.find({ user: user });
    res.status(200).json(userRides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un trajet par ID
export const deleteRideById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRide = await Ride.findByIdAndDelete(id);
    if (!deletedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.status(200).json({ message: 'Ride deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
