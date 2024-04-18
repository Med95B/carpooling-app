
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTrips } from '../../store/tripSlice';
import { selectInvitationsError,selectInvitationsStatus ,selectInvitationsMessage} from '../../store/invitationSlice';
import UserCard from '../user/userCard';
import { useState } from 'react';
import { MapContainer, TileLayer, Polyline,Marker,Popup } from "react-leaflet";

const DetailsTrip = () => {
  const { id } = useParams();
  const { status: invitationStatus, error: invitationError, message: invitationMessage } = useSelector(state => ({
    status: selectInvitationsStatus(state),
    error: selectInvitationsError(state),
    message: selectInvitationsMessage(state)
  }));

  const trip = useSelector(selectTrips).find(trip => trip._id === id)
  console.log(trip);
  
  const { ride: { departure, arrival, route }, singleTrip, dailyTrip, driver, passengers } = trip;

  const [showMapToggel, setShowMapToggel] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const showMap = () => {
    setShowMapToggel(!showMapToggel);
  }

  const depart = [departure?.coordinates[0], departure?.coordinates[1]];
  const arrivee = [arrival?.coordinates[0], arrival?.coordinates[1]];

  return (
    <div className="container mt-5">
      <h2>Trip Details</h2>
      <div>
        {showMapToggel && (
          <div className="TripMap">
            <MapContainer center={depart} zoom={15} scrollWheelZoom={false} style={{ height: '400px', margin: '35px' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={depart}>
                <Popup>{departure.name}</Popup>
              </Marker>
              <Marker position={arrivee}>
                <Popup>{arrival.name}</Popup>
              </Marker>
              {route && route.coordinates && (
                <Polyline positions={route.coordinates.map(coord => [coord.lat, coord.lng])} color="blue" weight='7' opacity='0.7' />
              )}
            </MapContainer>
          </div>
        )}

        {departure && arrival && (
          <div className='card p-2 my-1' onClick={showMap} style={{ cursor: 'pointer' }}>
            <p><strong>Depart:</strong> {departure.name}</p>
            <p><strong>Destination:</strong> {arrival.name}</p>
          </div>
        )}

        {singleTrip && (
          <div className='card p-2 my-1'>
            <p><strong>Date:</strong> {formatDate(singleTrip.date)}</p>
            <p><strong>Time:</strong> {singleTrip.time}</p>
          </div>
        )}
        
        {dailyTrip && (
          <div>
            <p><strong>Start Time:</strong> {dailyTrip.startTime}</p>
            <p><strong>End Time:</strong> {dailyTrip.endTime}</p>
            <p><strong>Days:</strong> {dailyTrip.days.join('-')}</p>
          </div>
        )}

        {driver && (
          <div>
            <h3>Driver</h3>
            <UserCard user={driver} tripId={id} />
          </div>
        )}

        {passengers && passengers.length > 0 && (
          <div>
            <h3>Passengers</h3>
            {passengers.map(passenger => (
              <UserCard user={passenger} key={passenger._id} tripId={id} />
            ))}
          </div>
        )}
      </div>

      {invitationStatus === 'succeeded' && (
        <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
          {invitationMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {invitationStatus === 'failed' && (
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          {invitationError}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
};

export default DetailsTrip;
