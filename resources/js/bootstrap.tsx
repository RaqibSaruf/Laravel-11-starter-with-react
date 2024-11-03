import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth.context';
import AppRoutes from '@/routers'; // Import your routes
import { LoaderProvider } from '@/contexts/loader.context';
import Loader from '@/components/Loader';
import AppQueryClientProvider from './utils/app-query-client';

const App: React.FC = () => (
  <AppQueryClientProvider>
    <LoaderProvider>
      <AuthProvider>
        <Router>
          <Loader />
          <AppRoutes /> {/* Use AppRoutes here */}
        </Router>
      </AuthProvider>
    </LoaderProvider>
  </AppQueryClientProvider>
);

export default App;
