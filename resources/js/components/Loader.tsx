import React from 'react';
import { useLoader } from '@/hooks/useLoader';

const Loader: React.FC = () => {
  const { loading } = useLoader();

  return loading ? <div className="loader">Loading...</div> : null;
};

export default Loader;
