<<<<<<< HEAD
// src/guards/AdminGuard.jsx
import { Navigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

=======
// src/guards/AdminGuard.jsx
import { Navigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default AdminGuard;