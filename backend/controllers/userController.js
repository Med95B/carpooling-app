import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Contrôleur pour enregistrer un nouvel utilisateur
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role, vehicleInfo } = req.body;

    // Vérifier si l'email ou le téléphone existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone number already exists' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ firstName, lastName, email, phone, password, role, vehicleInfo });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour se connecter et obtenir un token JWT
const login = async (req, res) => {
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
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Autres méthodes pour le contrôleur de l'utilisateur

export { register, login };
