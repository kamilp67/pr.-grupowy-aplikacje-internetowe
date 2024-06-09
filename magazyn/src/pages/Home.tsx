import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../firebaseConfig";

export const Home = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
      <div className="d-flex flex-column w-100 align-items-center justify-content-center m-5">
        <h1>Welcome to the Warehouse Management System</h1>
        <p>This is the warehouse management page. Please log in to manage warehouse items.</p>
        {user ? (
          <p>Hello, {user.email}!</p>
        ) : (
          <Link to="/login" className="btn btn-primary mt-3">Log In</Link>
        )}
      </div>
  );
}
