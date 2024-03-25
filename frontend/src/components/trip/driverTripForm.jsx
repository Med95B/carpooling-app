import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip, selectTripsStatus, selectTripsError } from '../../store/tripSlice';
import VehicleForm from '../vehicle/vehicleForm';
import { selectRides } from '../../store/rideSlice';
import { selectVehicles } from '../../store/vehicleSlice';

const DriverTripForm = () => {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [formData, setFormData] = useState({
    tripType: 'single',
    date: '',
    time: '',
    startTime: '',
    endTime: '',
    days: [],
    selectedRide: '',
    selectedVehicle: ''
  });
  const dispatch = useDispatch();
  const tripStatus = useSelector(selectTripsStatus);
  const tripError = useSelector(selectTripsError);
  const vehicles = useSelector(selectVehicles);
  const rides=useSelector(selectRides)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTrip(formData));
    console.log('Submitted Trip Data:', formData);
    setFormData({
      tripType: 'single',
      date: '',
      time: '',
      startTime: '',
      endTime: '',
      days: [],
      selectedRide: '',
      selectedVehicle: ''
    });
  };

  const handleShowVehicleForm = () => {
    setShowVehicleForm(true);
  };

  return (
    <div className="container mt-5">
      <h2>Driver Trip Form</h2>
      {!showVehicleForm && (
        <button
          className="btn btn-primary mb-3"
          onClick={handleShowVehicleForm}
        >
          Register Vehicle
        </button>
      )}

      {showVehicleForm && <VehicleForm />}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tripType" className="form-label">Trip Type</label>
          <select className="form-select" id="tripType" name="tripType" value={formData.tripType} onChange={handleChange}>
            <option value="single">Single</option>
            <option value="daily">Daily</option>
          </select>
        </div>
        {formData.tripType === 'single' && (
          <>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">Time</label>
              <input type="time" className="form-control" id="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
          </>
        )}
        {formData.tripType === 'daily' && (
          <>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">Start Time</label>
              <input type="time" className="form-control" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">End Time</label>
              <input type="time" className="form-control" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Days</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Monday" name="days" value="Monday" checked={formData.days.includes('Monday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Monday">Monday</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Tuesday" name="days" value="Tuesday" checked={formData.days.includes('Tuesday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Tuesday">Tuesday</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Wednesday" name="days" value="Wednesday" checked={formData.days.includes('Wednesday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Wednesday">Wednesday</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Thursday" name="days" value="Thursday" checked={formData.days.includes('Thursday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Thursday">Thursday</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Friday" name="days" value="Friday" checked={formData.days.includes('Friday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Friday">Friday</label>
              </div>
              <div className="form-check">
              <input className="form-check-input" type="checkbox" id="Saturday" name="days" value="Saturday" checked={formData.days.includes('Saturday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Saturday">Saturday</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Sunday" name="days" value="Sunday" checked={formData.days.includes('Sunday')} onChange={handleChange} />
                <label className="form-check-label" htmlFor="Sunday">Sunday</label>
              </div>
            </div>
          </>
        )}
        <div className="mb-3">
          <label htmlFor="selectedRide" className="form-label">Select Ride</label>
          <select className="form-select" id="selectedRide" name="selectedRide" value={formData.selectedRide} onChange={handleChange} required>
            <option value="">Select Ride</option>
            {rides.map((ride) => (
              <option key={ride._id} value={ride._id}>{ride.departure} - {ride.arrival}</option>
            ))}
          </select>
        </div>
        {vehicles.length > 0 && (
          <div className="mb-3">
            <label htmlFor="selectedVehicle" className="form-label">Select Vehicle</label>
            <select className="form-select" id="selectedVehicle" name="selectedVehicle" value={formData.selectedVehicle} onChange={handleChange} required>
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                {`${vehicle.make} ${vehicle.model} (${vehicle.year})`}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className="btn btn-primary">Enregistrer</button>
    </form>
    
    {tripStatus === 'failed' && (
      <div className="alert alert-danger mt-3" role="alert">
        {tripError}
      </div>
    )}
    {tripStatus === 'succeeded' && (
      <div className="alert alert-success mt-3" role="alert">
        Trip request successfully created!
      </div>
    )}
  </div>
);
};

export default DriverTripForm;

