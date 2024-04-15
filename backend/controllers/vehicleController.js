import Vehicle from '../models/Vehicle.js';
import sendNewVehicleEmail from '../services/vehicleEmailService.js';

// Créer un nouveau véhicule
export const createVehicle = async (req, res) => {
  const {
    make,
    model,
    year,
  } = req.body;

  const { 
    driverLicenseImage,
    vehicleRegistrationImage,
    vehicleInsuranceImage,
    vehicleImage
  } = req.files;

  const userId = req.user._id; // user id récupéré via l'authMiddleware
  
  try {
    const newVehicle = new Vehicle({
      make,
      model,
      year,
     driverLicenseImage: driverLicenseImage[0].filename, // Récupérer le chemin du fichier
      vehicleRegistrationImage: vehicleRegistrationImage[0].filename,
      vehicleInsuranceImage: vehicleInsuranceImage[0].filename,
      vehicleImage: vehicleImage[0].filename,
      owner: userId
    });

    const savedVehicle = await newVehicle.save();

    //envoyer email à ladmin
    const userEmail=req.user.email
    sendNewVehicleEmail(userEmail,{make,model,year,userId})


    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre a jour un vehicule par ID
export const updateVehicleById = async (req, res) => {
  const { id } = req.params;
  const {
    make,
    model,
    year,
  } = req.body;

  const { 
    driverLicenseImage,
    vehicleRegistrationImage,
    vehicleInsuranceImage,
    vehicleImage
  } = req.files;

  const userId = req.user._id; // user id récupéré via l'authMiddleware

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Verifier si le user est le owner du vehicule
    if (String(vehicle.owner) !== String(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.driverLicenseImage = driverLicenseImage[0].filename || vehicle.driverLicenseImage;
    vehicle.vehicleRegistrationImage = vehicleRegistrationImage[0].filename || vehicle.vehicleRegistrationImage;
    vehicle.vehicleInsuranceImage = vehicleInsuranceImage[0].filename || vehicle.vehicleInsuranceImage;
    vehicle.vehicleImage = vehicleImage[0].filename || vehicle.vehicleImage;

    //envoyer email à ladmin
    const userEmail=req.user.email
    sendNewVehicleEmail(userEmail,{make,model,year,userId})

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir tous les vehicules d'un user
export const getUserVehicles = async (req, res) => {
  const  userId  = req.user; // user id recupere via l'authMiddleware

  try {
    const vehicles = await Vehicle.find({ owner: userId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir tous les véhicules de la base de données
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un vehicule par ID
export const getVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un vehicule par ID
export const deleteVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Vérifier si le user est le owner du vehicule
    if (String(vehicle.owner) !== String(req.user.userId)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
