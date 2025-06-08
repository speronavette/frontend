<<<<<<< HEAD
import { Navigate, useLocation } from 'react-router-dom';

const DriverGuard = ({ children }) => {
  const token = localStorage.getItem('driverToken');
  const location = useLocation();

  if (!token) {
    // Rediriger vers la page de connexion si pas de token
    return <Navigate to="/driver/login" state={{ from: location }} replace />;
  }

  return children;
};

=======
import { Navigate, useLocation } from 'react-router-dom';

const DriverGuard = ({ children }) => {
  const token = localStorage.getItem('driverToken');
  const location = useLocation();

  if (!token) {
    // Rediriger vers la page de connexion si pas de token
    return <Navigate to="/driver/login" state={{ from: location }} replace />;
  }

  return children;
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default DriverGuard;