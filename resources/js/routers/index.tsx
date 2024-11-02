import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import NotFound from '@/pages/errors/notFound';
import Unathorized from '@/pages/errors/unauthorized';
import AuthMiddleware from '@/middlewares/auth.middleware';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route element={<AuthMiddleware />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>

    {/* Catch-all route for 401 - Unauthorized Request */}
    <Route path="/unauthorized" element={<Unathorized />} />
    {/* Catch-all route for 404 - Not Found */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
