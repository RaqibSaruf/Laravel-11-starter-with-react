import React from 'react';
import { Link } from 'react-router-dom';

const Unathorized: React.FC = () => {
  return (
    <div>
      <h1>401 - Unauthorized</h1>
      <p>Sorry, the page you are looking for unauthorized.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default Unathorized;
