import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, deleteUser,selectUser,selectError,selectMessage } from '../../store/userSlice.js';
import config from '../../config/config.js';

const Profile = () => {

  const user = useSelector(selectUser);
  const photoUser=config.baseURL+user.photo
  console.log(user);
  const error=useSelector(selectError)
  const message=useSelector(selectMessage)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    photo: user.photo ||'',
    idCardR:user.idCardR||'',
    idCardV:user.idCardV||''
  });

  const [fileReader,setFileReader]=useState({
  photo: user.photo ||'',
    idCardR:user.idCardR||'',
    idCardV:user.idCardV||''
})

const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file })
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileReader({ ...fileReader, [e.target.name]: reader.result });
      };
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
      idCardR:user.idCardR,
      idCardV:user.idCardV

    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form=new FormData()
    form.append('firstName',formData.firstName)
    form.append('lastName',formData.lastName)
    form.append('email',formData.email)
    form.append('phone',formData.phone)
    form.append('photo',formData.photo)
    form.append('idCardR',formData.idCardR)
    form.append('idCardV',formData.idCardV)
    dispatch(updateUserProfile(form));
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
      <img src={photoUser} className="card-img-top mx-auto mt-3" alt="profile"
      style={{width:'200px',height:'200px',objectFit:'cover',borderRadius:'50%'}}
      />
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
              {fileReader.photo && (
                <img
                  src={fileReader.photo}
                  alt="Profile"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="idCardR" className="form-label">ID Card Recto</label>
              <input
                type="file"
                className="form-control"
                id="idCardR"
                name="idCardR"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
              />
              {fileReader.idCardR && (
                <img
                  src={fileReader.idCardR}
                  alt="ID CardR"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="idCardV" className="form-label">ID Card Verso</label>
              <input
                type="file"
                className="form-control"
                id="idCardV"
                name="idCardV"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
              />
              {fileReader.idCardV && (
                <img
                  src={fileReader.idCardV}
                  alt="ID CardV"
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
       {message&& <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
            {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

      }
    </div>
  );
};

export default Profile;


