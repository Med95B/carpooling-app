
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTrips, selectTripsStatus, selectTripsError } from '../../store/tripSlice';
import UserCard from '../user/userCard';

const DetailsTrip = () => {
  const { id } = useParams();
  const trips = useSelector(selectTrips);
  const trip = trips.find(trip => trip._id === id);
  console.log(trip);
  const tripStatus = useSelector(selectTripsStatus);
  const tripError = useSelector(selectTripsError);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
 
  return (
    <div className="container mt-5">
      <h2>Trip Details</h2>
      {tripStatus === 'loading' && (
        <div className="alert alert-info mt-3" role="alert">
          Loading...
        </div>
      )}
      <div>
        {trip?.ride&&<div>
            <p><strong>Departure:</strong> {trip.ride.departure}</p>
         <p><strong>Arrival:</strong> {trip.ride.arrival}</p>
        </div>
        }
       
        {trip?.singleTrip && (
          <div>
            <p><strong>Date:</strong> {formatDate(trip.singleTrip.date)}</p>
            <p><strong>Time:</strong> {trip.singleTrip.time}</p>
          </div>
        )}
        {trip?.dailyTrip && (
          <div>
            <p><strong>Start Time:</strong> {trip.dailyTrip.startTime}</p>
            <p><strong>End Time:</strong> {trip.dailyTrip.endTime}</p>
            <p><strong>Days:</strong> {trip.dailyTrip.days.join('-')}</p>
          </div>
        )}
        {trip?.driver && (
          <div>
            <h3>Driver</h3>
            <UserCard user={trip.driver} tripId={id}/>
          </div>
        )}
        {trip?.passengers.length > 0 && (
          <div>
            <h3>Passengers</h3>
            {trip.passengers.map(passenger => (
             <UserCard user={passenger} key={passenger._id} tripId={id}/>
            ))}
          </div>
        )}
      </div>
      {tripStatus === 'failed' && (
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          {tripError}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
};

export default DetailsTrip;
