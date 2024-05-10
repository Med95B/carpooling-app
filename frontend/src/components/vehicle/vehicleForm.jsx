import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVehicle, selectVehiclesStatus, selectVehiclesError } from '../../store/vehicleSlice';


const VehicleForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    driverLicenseImage: '',
    vehicleRegistrationImage: '',
    vehicleInsuranceImage: '',
    vehicleImage: ''
  });

  const dispatch = useDispatch();
  const vehicleStatus = useSelector(selectVehiclesStatus);
  const vehicleError = useSelector(selectVehiclesError);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('make', formData.make);
    form.append('model', formData.model);
    form.append('year', formData.year);
    form.append('driverLicenseImage', formData.driverLicenseImage);
    form.append('vehicleRegistrationImage', formData.vehicleRegistrationImage);
    form.append('vehicleInsuranceImage', formData.vehicleInsuranceImage);
    form.append('vehicleImage', formData.vehicleImage);
    dispatch(createVehicle(form))
    
    setFormData({
      make: '',
      model: '',
      year: '',
      driverLicenseImage: '',
      vehicleRegistrationImage: '',
      vehicleInsuranceImage: '',
      vehicleImage: ''
    });
  };
  

  return (
    <div className="container mt-5">
      <h2>Vehicle Informations</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="make" className="form-label">Make</label>
          <input type="text" className="form-control" id="make" name="make" value={formData.make} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">Model</label>
          <input type="text" className="form-control" id="model" name="model" value={formData.model} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year</label>
          <input type="number" className="form-control" id="year" name="year" value={formData.year} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="driverLicenseImage" className="form-label">Driver License Image</label>
          <input type="file" className="form-control" id="driverLicenseImage" name="driverLicenseImage" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleRegistrationImage" className="form-label">Vehicle Registration Image</label>
          <input type="file" className="form-control" id="vehicleRegistrationImage" name="vehicleRegistrationImage" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleInsuranceImage" className="form-label">Vehicle Insurance Image</label>
          <input type="file" className="form-control" id="vehicleInsuranceImage" name="vehicleInsuranceImage" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleImage" className="form-label">Vehicle Image</label>
          <input type="file" className="form-control" id="vehicleImage" name="vehicleImage" onChange={handleChange} required />
  </div>
        <button type="submit" className="btn btn-primary">Submit Vehicle Information</button>
      </form>

      {vehicleStatus === 'failed' && (
        <div className="alert alert-danger mt-3" role="alert">
          {vehicleError}
        </div>
      )}
      {vehicleStatus === 'succeeded' && (
        <div className="alert alert-success mt-3" role="alert">
          Vehicle informations submitted successfully. Admin will review the documents.
        </div>
      )}
    </div>
  );
};

export default VehicleForm;
