import { useSelector, useDispatch } from 'react-redux';
import { updateUserRole, selectUser } from '../../store/userSlice.js';
import {useNavigate} from 'react-router-dom'

const UserRole = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
const navigate=useNavigate()

  const handleDriverSelect = () => {
    dispatch(updateUserRole({ userId: user._id, isDriver: true }));
    navigate('/driver')
  };

  const handlePassengerSelect = () => {
    dispatch(updateUserRole({ userId: user._id, isDriver: false }));
  navigate('/passenger')
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Choose your role</h2>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleDriverSelect}
        >
          I want to drive
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={handlePassengerSelect}
        >
          I want to ride
        </button>
      </div>
    </div>
  );
};

export default UserRole;
