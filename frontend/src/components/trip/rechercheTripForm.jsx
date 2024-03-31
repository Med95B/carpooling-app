import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { searchTripsByCriteria, selectTrips,selectTripsStatus,selectTripsError  } from '../../store/tripSlice';
import { Link } from 'react-router-dom';

const RechercheTripForm = () => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    date: ''
  });
const trips=useSelector(selectTrips)
const tripsStatus = useSelector(selectTripsStatus);
const tripsError=useSelector(selectTripsError)



  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchTripsByCriteria(formData));
    setFormData({
      departure: '',
      destination: '',
      date: ''
    }); 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  return (
    <div className="container mt-5">
      <h2>Rechercher un trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departure" className="form-label">Départ</label>
          <input
            type="text"
            className="form-control"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">Destination</label>
          <input
            type="text"
            className="form-control"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Rechercher</button>
      </form>
      {tripsStatus === 'loading' && (
        <div className="alert alert-info mt-3" role="alert">
          Recherche en cours...
        </div>
      )}

      {tripsStatus === 'succeeded' && trips.length > 0 && (
        <div className='mt-3'>
          <h3>Résultats de la recherche :</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Départ</th>
                <th>Arrivée</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td>{trip.ride.departure}</td>
                  <td>{trip.ride.arrival}</td>
                  <td>{trip.singleTrip ? formatDate(trip.singleTrip.date) : trip.dailyTrip.days.join(', ')}</td>
                  <td>{trip.singleTrip ? trip.singleTrip.time : `${trip.dailyTrip.startTime} - ${trip.dailyTrip.endTime}`}</td>
                  <td>
                    <Link to={`/trip/${trip._id}`} className="btn btn-primary">Voir détails</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tripsStatus === 'succeeded' && trips.length === 0 && (
        <div className="alert alert-info alert-dismissible fade show mt-3" role="alert">
          Aucun trip disponible, vous pouvez créer un trip.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {tripsStatus === 'failed' && (
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
            {tripsError}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
 
      
    </div>
  );
};

export default RechercheTripForm;
