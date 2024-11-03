import React from 'react';
import LoginComponent from '@/components/auth/Login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }
  return <LoginComponent />;
};

export default Login;
