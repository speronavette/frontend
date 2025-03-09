// src/guards/AdminGuard.jsx
import { Navigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default AdminGuard;