/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import { sendInvitation } from '../../store/invitationSlice';

const UserCard = ({ user, tripId }) => {
  const dispatch = useDispatch();

  const handleInvite = (userId) => {
    dispatch(sendInvitation({ recipientId: userId, tripId }));
  };

  return (
    <div className="card my-2">
      <div className="card-body">
        <h5 className="card-title">{user.firstName} {user.lastName}</h5>
        <p className="card-text"><strong>Email:</strong> {user.email}</p>
        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
        <p className="card-text"><strong>Gender:</strong> {user.gender}</p>
        <button className="btn btn-primary" onClick={() => handleInvite(user._id)}>Envoyer une invitation</button>
      </div>
    </div>
  );
};

export default UserCard;

