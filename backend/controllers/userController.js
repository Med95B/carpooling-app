import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import activationMail from '../services/userActivationMail.js';

// Fonction pour générer un token JWT
const generateToken = (user,t) => {
  return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:t})
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
// Créer un objet user avec les infos recuperées de la req
const newUser = { firstName:firstName, lastName:lastName,gender:gender ,email:email, phone:phone, password:hashedPassword }
     // Générer le token JWT pour verification d'email
     const activationToken = generateToken(newUser,'5m');
     const activationUrl = `${process.env.appURL}/activation/${activationToken}`;

           //envoyer l'email de verification
           await activationMail({
            email: newUser.email,
            subject: "Activate your account",
            message: `Hello ${newUser.firstName+' '+newUser.lastName}, please click on the link to activate your account: ${activationUrl}`,
          });
          
          res.status(201).json({ message: `please check your email : ${newUser.email} to activate your account!` });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };

  /*  // Créer un nouvel utilisateur avec le mot de passe hashé
    const newUser = new User({ firstName, lastName,gender ,email, phone, password: hashedPassword });
    await newUser.save();
    
    // Générer le token JWT
    const token = generateToken(newUser._id,newUser.firstName,newUser.lastName,newUser.gender ,newUser.email, newUser.phone,newUser.isDriver,newUser.photo,newUser.idCard);
  

    res.status(201).json({ message: 'User created successfully', user: newUser, token:token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  */

// activer un nouvel user
export const activation= async (req, res) => {

  const activationToken=req.body.token

  try {
      
      const newUser = jwt.verify(activationToken,process.env.JWT_SECRET);
      
if (!newUser) {
        return res.status(400).json({ message: 'Invalid Token!!!' });

      }
      const { firstName, lastName,gender ,email, phone, password } = newUser.user;

      let user = await User.findOne({ $or: [{ email }, { phone }] });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        firstName, lastName,gender ,email, phone, password
      });
    
      const savedUser=await user.save()
      // Générer le token JWT
      const token = generateToken(savedUser,'30d');

      res.status(201).json({ message: 'your account activated successfully', user: savedUser, token:token });



    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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
   const token = generateToken(user,'30d');

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
const token = generateToken(user._id,user.firstName,user.lastName,user.gender ,user.email, user.phone,user.isDriver,user.photo,user.idCard);
    res.status(200).json({user:user,token:token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Contrôleur pour mettre à jour le profil de l'utilisateur
export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, email, phone } = req.body;
  const { photo,idCardR,idCardV } = req.files;
  
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName
    user.lastName = lastName 
    user.email = email 
    user.phone = phone

    if (photo && photo.length > 0) {
      user.photo = photo[0].filename;
    }
    if (idCardR && idCardR.length > 0) {
      user.idCardR = idCardR[0].filename;
    }
    if (idCardV && idCardV.length > 0) {
      user.idCardV = idCardV[0].filename;
    }
    const updatedProfile = await user.save();
// Générer le token JWT
const token = generateToken(updatedProfile._id,updatedProfile.firstName,updatedProfile.lastName,updatedProfile.gender ,updatedProfile.email, updatedProfile.phone,updatedProfile.isDriver,updatedProfile.photo,updatedProfile.idCard);
    res.status(200).json({ message: 'Profile updated successfully',user:updatedProfile,token:token });
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


