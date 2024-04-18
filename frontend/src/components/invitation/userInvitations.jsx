import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {declineInvitation ,acceptInvitation,selectInvitationsMessage,getInvitations, selectInvitations,selectInvitationsError,cancelInvitation, selectInvitationsStatus  } from '../../store/invitationSlice';
import { selectUser } from '../../store/userSlice';

const UserInvitation = () => {
  const dispatch = useDispatch();
  const invitations = useSelector(selectInvitations);
  console.log(invitations);
const invitationsError=useSelector(selectInvitationsError)
const invitationMessage=useSelector(selectInvitationsMessage)
const invitationsStatus=useSelector(selectInvitationsStatus)
const currentUser = useSelector(selectUser);

useEffect(() => {
    dispatch(getInvitations());
  }, [dispatch]);


  const handleCancel = (id) => {
    dispatch(cancelInvitation(id));
  };

  const handleAcceptInvitation = (id) => {
    dispatch(acceptInvitation(id));
  };

  const handleDeclineInvitation = (id) => {
    dispatch(declineInvitation(id));
  };

  return (
    <div className="container mt-5">
      <h2>Invitations</h2>
      {invitationsStatus === 'loading' && (
        <div className="alert alert-info mt-3" role="alert">
          Chargement des invitations...
        </div>
      )}
      {invitationMessage && (
        <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
          {invitationMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {invitations.length>0 ? invitations.map(invitation => (
          <div key={invitation._id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Invitation</h5>
                {invitation.sender && (
                  <p className="card-text">From : {invitation.sender.firstName} {invitation.sender.lastName}</p>
                )}
                {invitation.recipient && (
                  <p className="card-text">To : {invitation.recipient.firstName} {invitation.recipient.lastName}</p>
                )}
                <p className="card-text">Status : {invitation.status}</p>
                {invitation.trip && (
                  <div>
                    <ul className="list-group">
                      <li className="list-group-item"><strong>Depart :</strong> {invitation.trip.ride?.departure.name}</li>
                      <li className="list-group-item"><strong>Destination :</strong> {invitation.trip.ride?.arrival.name}</li>
                    </ul>
                  </div>
                )}
                    {invitation.sender && currentUser._id === invitation.sender._id &&invitation.status === 'pending' && (
                  <button className="btn btn-danger mt-2" onClick={() => handleCancel(invitation._id)}>
                    Cancel Invitation
                  </button>
                )}
                   {invitation.recipient && currentUser._id === invitation.recipient._id && invitation.status === 'pending' && (
                <div className='mt-2'>
                  <button className="btn btn-success me-2" onClick={() => handleAcceptInvitation(invitation._id)}>Accept</button>
                  <button className="btn btn-warning" onClick={() => handleDeclineInvitation(invitation._id)}>Decline</button>
                </div>
              )}
              </div>
            </div>
          </div>
        )): <p>{invitationsError}</p>  || <p>pas d&apos;invitations pour le moment.</p> }
      </div>
    </div>
  );
};

export default UserInvitation;

