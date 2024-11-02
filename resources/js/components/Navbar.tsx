import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
      {isAuthenticated ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
