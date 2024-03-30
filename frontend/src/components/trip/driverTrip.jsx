import { useState } from 'react';
import DriverTripForm from './driverTripForm.jsx';
import RechercheTripForm from './rechercheTripForm.jsx';

const DriverTrip = () => {
  const [showSearchForm, setShowSearchForm] = useState(true);

  const handleSeePassengersClick = () => {
    setShowSearchForm(true);
  };

  const handleOfferTripClick = () => {
    setShowSearchForm(false);
  };

  return (
    <div className="container mt-5">
      <h2>Driver Trip</h2>
      <div className="mb-3">
        <button
          className="btn btn-primary me-3"
          onClick={handleSeePassengersClick}
        >
          See Available Passengers
        </button>
        <button
          className="btn btn-primary"
          onClick={handleOfferTripClick}
        >
          Offer a Trip
        </button>
      </div>
      {showSearchForm ? (
        <RechercheTripForm />
      ) : (
        <DriverTripForm />
      )}
    </div>
  );
};

export default DriverTrip;
