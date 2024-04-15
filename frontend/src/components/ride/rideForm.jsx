import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRide, selectRidesStatus, selectRidesError } from '../../store/rideSlice.js'; 
import { Link } from 'react-router-dom';
import MapCard from '../map/MapCard.jsx';


const RideForm = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const status = useSelector(selectRidesStatus);
  const error = useSelector(selectRidesError);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRide({ departure, arrival }));
    setDeparture('');
    setArrival('');
  };

  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ride Form</h2>
      <h3 className='text-center'>Ajouter un trajet</h3>
      <MapCard/>
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
     <Link to={'/role'} className="btn btn-success mt-3">Go for trip</Link>
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

export default RideForm;

