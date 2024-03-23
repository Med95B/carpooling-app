
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, selectUser } from '../../store/userSlice.js';

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch de l'action de déconnexion
    dispatch(logoutUser());
    // Redirection vers la page de connexion après déconnexion
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">My Carpooling App</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
