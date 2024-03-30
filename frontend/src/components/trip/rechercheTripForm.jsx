import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchTripsByCriteria } from '../../store/tripSlice';

const RechercheTripForm = () => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    date: ''
  });

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
    </div>
  );
};

export default RechercheTripForm;
