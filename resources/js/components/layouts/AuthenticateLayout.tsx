import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Outlet } from 'react-router-dom';

const AuthenticateLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
        {isAuthenticated ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </nav>
      <Outlet />
    </div>
  );
};

export default AuthenticateLayout;
