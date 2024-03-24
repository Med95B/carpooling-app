import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRide, selectRidesStatus, selectRidesError } from '../../store/rideSlice.js'; 
import { selectUser } from '../../store/userSlice.js'; 
import { Link } from 'react-router-dom';

const PassengerForm = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const user = useSelector(selectUser); 
  console.log(user);
  const status = useSelector(selectRidesStatus);
  const error = useSelector(selectRidesError);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRide({ user: user.userId,departure, arrival }));
    setDeparture('');
    setArrival('');
  };

  // Afficher un message de chargement si le user n'est pas encore défini
  if (!user) {
    return <h1 className='text-center'>Loading...</h1>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Passenger Form</h2>
      <h3 className='text-center'>Ajouter un trajet</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departure" className="form-label">Departure</label>
          <input
            type="text"
            className="form-control"
            id="departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival" className="form-label">Arrival</label>
          <input
            type="text"
            className="form-control"
            id="arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
      <Link to="/trip" className="btn btn-success mt-3">Go for trip</Link> 
      {status === 'failed' && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
      {status === 'succeeded' && (
        <div className="alert alert-success mt-5" role="alert">
          Ride successfully created!
        </div>
      )}
    </div>
  );
};

export default PassengerForm;

