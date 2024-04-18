import { useState } from 'react';
import PassengerTripForm from './passengerTripForm.jsx';
import RechercheTripForm from './rechercheTripForm.jsx';

const PassengerTrip = () => {
  const [showSearchForm, setShowSearchForm] = useState(true);

  const handleSeeDriversClick = () => {
    setShowSearchForm(true);
  };

  const handleRequestTripClick = () => {
    setShowSearchForm(false);
  };

  return (
    <div className="container my-3">
      <h2>Passenger Trip</h2>
      <div className="mb-3">
        <button
          className="btn btn-primary me-3"
          onClick={handleSeeDriversClick}
        >
          See Available Drivers
        </button>
        <button
          className="btn btn-primary"
          onClick={handleRequestTripClick}
        >
          Request a Trip
        </button>
      </div>
      {showSearchForm ? (
        <RechercheTripForm />
      ) : (
        <PassengerTripForm />
      )}
    </div>
  );
};

export default PassengerTrip;
