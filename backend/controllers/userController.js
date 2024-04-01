import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Fonction pour générer un token JWT
const generateToken = (_id,firstName,lastName, email, phone,isDriver,photo,idCard) => {
  return jwt.sign(
    { _id,firstName,lastName, email, phone,isDriver,photo,idCard },
    process.env.JWT_SECRET,
    {expiresIn:'30d'}
  );
};

// Contrôleur pour enregistrer un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { firstName, lastName,gender ,email, phone, password } = req.body;

    // Vérifier si l'email ou le telephone existe deja
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone number already exists' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe hashé
    const newUser = new User({ firstName, lastName,gender ,email, phone, password: hashedPassword });
    await newUser.save();
    
    // Générer le token JWT
    const token = generateToken(newUser._id,newUser.firstName,newUser.lastName,newUser.gender ,newUser.email, newUser.phone,newUser.isDriver,newUser.photo,newUser.idCard);
    
    res.status(201).json({ message: 'User created successfully', user: newUser, token:token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour se connecter et obtenir un token JWT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Vérifier si le mot de passe est correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Générer le token JWT
    const token = generateToken(user._id,user.firstName,user.lastName,user.gender ,user.email, user.phone,user.isDriver,user.photo,user.idCard);

    res.status(200).json({ message: 'Login successful', user:user, token:token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le rôle de l'utilisateur (isDriver)
export const updateUserRole = async (req, res) => {
  const userId = req.user._id;
  const { isDriver } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isDriver },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
// Générer le token JWT
const token = generateToken(user._id, user.email, user.phone,user.isDriver);
    res.status(200).json({user:user,token:token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Contrôleur pour mettre à jour le profil de l'utilisateur
export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, email, phone } = req.body;
  const { photo,idCard } = req.files;
  
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName
    user.lastName = lastName 
    user.email = email 
    user.phone = phone
    user.photo = photo[0].path 
    user.idCard = idCard[0].path 
    const updatedProfile = await user.save();

    res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Contrôleur pour supprimer le compte de l'utilisateur
export const deleteUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ici, vous pouvez également ajouter d'autres actions comme supprimer les trips, les invitations, etc.
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


