// Header.jsx
import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RideHeader = ({ user, userData }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <header className="app-header">
      <div className="logo">
        <h1>SafeRide</h1>
      </div>
      {user && (
        <div className="user-menu">
          <span>Hi, {userData?.name || user.email}</span>
          <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </header>
  );
};

export default RideHeader;