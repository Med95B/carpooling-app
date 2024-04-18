import Trip from '../models/Trip.js';
import User from '../models/User.js';
import Ride from '../models/Ride.js';

// creer demane de trip (trip request)
export const createTrip = async (req, res) => {
  const { tripType, date, time, startTime, endTime, days, selectedRide } = req.body;
  const userId = req.user._id
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
  const user = req.user;

  try {
    const departureCoordinates = [departure.lat, departure.lng];
    const destinationCoordinates = [destination.lat, destination.lng];

    
    // Recherche des trajets au départ de la position spécifiée
    const departureRides = await Ride.find({
      'departure.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [departureCoordinates[0], departureCoordinates[1]]
          },
          $maxDistance: 3000 // Recherche dans un rayon de 1 kilomètre
        }
      }
    });

    // Recherche des trajets arrivant à la position spécifiée
    const arrivalRides = await Ride.find({
      'arrival.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [destinationCoordinates[1], destinationCoordinates[0]]
          },
          $maxDistance: 3000 // Recherche dans un rayon de 1 kilomètre
        }
      }
    });

    // Fusion des résultats des deux recherches
    const rideIds = [...departureRides, ...arrivalRides].map(ride => ride._id);
    //const rideIds = departureRides.map(ride => ride._id);
    //const rideIds = arrivalRides.map(ride => ride._id);

    let trips;
    if (user.isDriver) {
      trips = await Trip.find({
        'ride': { $in: rideIds },
        'driver': null,
        $or: [
          { 'singleTrip.date': date },
          { 'dailyTrip.days': { $in: [new Date(date).toLocaleDateString('en-US', { weekday: 'long' })] } },
        ]
      }).populate('ride')
        .populate('passengers', 'firstName lastName email phone gender');
    } else {
      trips = await Trip.find({
        'ride': { $in: rideIds },
        'driver': { $ne: null },
        $or: [
          { 'singleTrip.date': date },
          { 'dailyTrip.days': { $in: [new Date(date).toLocaleDateString('en-US', { weekday: 'long' })] } },
        ]
      }).populate('ride')
        .populate('driver', 'firstName lastName email phone gender')
        .populate('passengers', 'firstName lastName email phone gender');
    }

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtenir un trip par ID
export const getTripById = async (req, res) => {
  const { id } = req.params;
  try {

      const  trip = await Trip.findById(id)
      .populate('ride')
      .populate('driver', 'firstName lastName email phone gender')
      .populate('passengers', 'firstName lastName email phone gender');

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
