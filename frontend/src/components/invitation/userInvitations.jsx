import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvitations, selectInvitations } from '../../store/invitationSlice';

const UserInvitation = () => {
  const dispatch = useDispatch();
  const invitations = useSelector(selectInvitations);

  useEffect(() => {
    dispatch(getInvitations());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2>Invitations</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {invitations.map(invitation => (
          <div key={invitation._id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Invitation</h5>
                {invitation.sender && (
                  <p className="card-text">From: {invitation.sender.firstName} {invitation.sender.lastName}</p>
                )}
                {invitation.recipient && (
                  <p className="card-text">To: {invitation.recipient.firstName} {invitation.recipient.lastName}</p>
                )}
                <p className="card-text">Status: {invitation.status}</p>
                {invitation.trip && (
                  <div>
                    <p className="card-text">Trip Details:</p>
                    <ul className="list-group">
                      <li className="list-group-item">Departure: {invitation.trip.ride.departure}</li>
                      <li className="list-group-item">Arrival: {invitation.trip.ride.arrival}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInvitation;

