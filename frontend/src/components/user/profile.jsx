import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, deleteUser,selectUser,selectError } from '../../store/userSlice.js';

const Profile = () => {
  const user = useSelector(selectUser);
  const error=useSelector(selectError)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    photo: user.photo ||'',
    idCard:user.idCard||''
  });
console.log(formData);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, [e.target.name]: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      idCard:user.idCard
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteUser());
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
              />
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="idCard" className="form-label">ID Card</label>
              <input
                type="file"
                className="form-control"
                id="idCard"
                name="idCard"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
              />
              {formData.idCard && (
                <img
                  src={formData.idCard}
                  alt="ID Card"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </div>
            {isEditing ? (
              <div>
                <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
            )}
          </form>
          <div className="mt-3">
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
      {error&& <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
            {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

      }
    </div>
  );
};

export default Profile;


