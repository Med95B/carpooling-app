import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, deleteUser } from '../../store/userSlice';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUser());
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Profile;


