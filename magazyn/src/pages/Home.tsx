import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
      <div className="d-flex flex-column w-100 align-items-center justify-content-center m-5">
        <h1>Welcome to the Warehouse Management System</h1>
        <p>This is the warehouse management page. Please log in to manage warehouse items.</p>
        <Link to="/login" className="btn btn-primary mt-3">Log In</Link>
      </div>
  );
}
