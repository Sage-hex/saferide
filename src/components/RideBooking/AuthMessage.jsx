// AuthMessage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthMessage.css'

const AuthMessage = () => {
  return (
    <div className="auth-message">
      <h2>Please Sign In</h2>
      <p>You need to sign in to book a ride with SafeRide.</p>
      <div className="auth-buttons">
        <Link to="/login" className="auth-btn">Login</Link>
        <Link to="/" className="auth-btn">Home</Link>
        <Link to="/signup" className="auth-btn">Signup</Link>
      </div>
    </div>
  );
};

export default AuthMessage;
