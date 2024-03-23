
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import Navbar from './components/layout/Navbar.jsx';

const App = () => {
  return (
    <Router>
    <div>
    <Navbar />
      <h1 className="text-center mt-5">Welcome to My Carpooling App</h1>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
        {/* Redirection après l'inscription */}
        <Route path="/register-success" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
