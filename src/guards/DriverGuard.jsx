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

export default DriverGuard;