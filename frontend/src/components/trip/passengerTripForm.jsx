import { useState,useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRides ,selectRides,selectRidesError, selectRidesStatus} from '../../store/rideSlice.js';
import { createTrip,selectTripsStatus,selectTripsError } from '../../store/tripSlice.js';

const PassengerTripForm = () => {
  const [formData, setFormData] = useState({
    tripType: 'single',
    date: '',
    time: '',
    startTime: '',
    endTime: '',
    days: [],
    selectedRide: ''
  });
  const dispatch = useDispatch();
  const rides = useSelector(selectRides);
  const rideError=useSelector(selectRidesError)
  const rideStauts=useSelector(selectRidesStatus)
  const tripStatus = useSelector(selectTripsStatus);
  const tripError = useSelector(selectTripsError);
  
useEffect(() => {
    dispatch(getUserRides());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'days') {
      const selectedDays = formData.days.includes(value)
        ? formData.days.filter(day => day !== value)
        : [...formData.days, value];
      setFormData({ ...formData, days: selectedDays });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        selectedRide: ''
      })
  };

  return (
    <div className="container mt-5">
      <h2>Passenger Trip Form</h2>
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
              <option key={ride._id} value={ride._id}>{ride.route.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
      { (tripStatus === 'failed' || rideStauts=== 'failed') && (
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          {tripError || rideError}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      { (tripStatus === 'succeeded' )&& (
        <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
          Trip request successfully created!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
};

export default PassengerTripForm;


