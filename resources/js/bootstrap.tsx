import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/auth.context';
import AppRoutes from '@/routers'; // Import your routes
import { LoaderProvider } from '@/contexts/loader.context';
import Loader from '@/components/Loader';

const App: React.FC = () => (
  <LoaderProvider>
    <AuthProvider>
      <Router>
        <Navbar />
        <Loader />
        <AppRoutes /> {/* Use AppRoutes here */}
      </Router>
    </AuthProvider>
  </LoaderProvider>
);

export default App;
