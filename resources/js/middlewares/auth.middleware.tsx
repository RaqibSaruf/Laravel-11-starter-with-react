import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types/role-permission';

interface AuthMiddlewareProps {
  allowedRoles?: Role[];
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ allowedRoles }) => {
  const { isAuthenticated, authUser, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (authUser && allowedRoles && !authUser.roles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AuthMiddleware;
