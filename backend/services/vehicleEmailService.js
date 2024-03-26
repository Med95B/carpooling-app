import transporter from './mailer.js'; 

const sendNewVehicleEmail = (from, vehicleData) => {
  const mailOptions = {
    from: from, 
    to:  process.env.EMAIL_ADMIN, 
    subject:'Un nouveau véhicule a été enregistré', 
    html: `
    <ul>
    <li>Driver: ${vehicleData.userId}</li>
      <li>Marque: ${vehicleData.make}</li>
      <li>Modèle: ${vehicleData.model}</li>
      <li>Année: ${vehicleData.year}</li>
    </ul>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
    } else {
      console.log('E-mail envoyé avec succès :', info.response);
    }
  });
};

export default sendNewVehicleEmail;

