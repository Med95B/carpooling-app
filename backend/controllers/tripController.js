import Trip from '../models/Trip.js';
import User from '../models/User.js';
import Ride from '../models/Ride.js';

// creer demane de trip (trip request)
export const createTrip = async (req, res) => {
  const { tripType, date, time, startTime, endTime, days, selectedRide } = req.body;
  const userId = req.user
  try {
    // verifier le role du user (driver ou passager)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let newTrip;
    if (user.isDriver) {
      newTrip = new Trip({
        ride: selectedRide,
        driver: userId,
        passengers: [],
        singleTrip: tripType === 'single' ? { date, time } : null,
        dailyTrip: tripType === 'daily' ? { startTime, endTime, days } : null,
      });
    } else {
      newTrip = new Trip({
        ride: selectedRide,
        driver: null,
        passengers: [userId],
        singleTrip: tripType === 'single' ? { date, time } : null,
        dailyTrip: tripType === 'daily' ? { startTime, endTime, days } : null,
      });
    }

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir tous les trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rechercher les trips par critères
export const searchTripsByCriteria = async (req, res) => {
  const { departure, destination, date } = req.body;
  try {
    const rides = await Ride.find({
      departure: departure,
      arrival: destination
    });

    const rideIds = rides.map(ride => ride._id);

    const trips = await Trip.find({
      'ride': { $in: rideIds },
      $or: [
        { 'singleTrip.date': date },
        { 'dailyTrip.days': { $in: [new Date(date).toLocaleDateString('en-US', { weekday: 'long' })] } },
      ]
    }).populate('ride');

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtenir un trip par ID
export const getTripById = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une demande de trip par ID
export const deleteTripById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrip = await Trip.findByIdAndDelete(id);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
