import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRide, selectRidesStatus, selectRidesError } from '../../store/rideSlice.js'; 
import { Link } from 'react-router-dom';
import RideMap from './RideMap.jsx';

const RideForm = () => {
  const [departure, setDeparture] = useState({});
  console.log(departure);
  const [arrival, setArrival] = useState({});
  console.log(arrival);
  const [routes, setRoutes] = useState([{}]);
  console.log(routes);
  const [selectedRoute,setSelectedRoute]=useState({})
  console.log(selectedRoute);
  const status = useSelector(selectRidesStatus);
  const error = useSelector(selectRidesError);
  const dispatch = useDispatch();

  const handleRoutes = (routes) => {
    setRoutes(routes);
  };

  const handleWaypointsSelect = (waypoints) => {
    setDeparture(waypoints[0]);
    setArrival(waypoints[waypoints.length - 1]);
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(createRide({ departure:departure.latlng,arrival: arrival.latlng, route: selectedRoute.coordinates }));
    setDeparture({});
    setArrival({});
    setRoutes([{}]);
    setSelectedRoute({})
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ride Form</h2>
      <h3 className='text-center'>Ajouter un trajet</h3>
      <RideMap onRoutesFound={handleRoutes} onWaypointsSelect={handleWaypointsSelect} />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departure" className="form-label">Departure</label>
          <input
            type="text"
            className="form-control"
            id="departure"
            value={departure.name||''}
            readOnly
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival" className="form-label">Arrival</label>
          <input
            type="text"
            className="form-control"
            id="arrival"
            value={arrival.name||''}
            readOnly
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="route" className="form-label">Select Route</label>
      <select className='form-select' name="route" id="route" onChange={e=>setSelectedRoute(routes[e.target.value])}
      value={selectedRoute?selectedRoute:routes[0]}
      >
        {routes.map((r,i)=><option key={i} value={i}>{r.name}</option>)}
       </select> 
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

