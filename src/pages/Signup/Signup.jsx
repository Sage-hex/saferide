import React, { useState } from "react";
import "./Signup.css";
import driverImage from "../../assets/driver.png";

const Signup = () => {
  const [role, setRole] = useState("user");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="signup-container">
      <div className="signup-image-section">
        <img src={driverImage} alt="Driver" className="signup-image" />
      </div>

      <div className="signup-form-section">
        <div className="signup-form-wrapper">
          <h2>Create an account with SafeRide</h2>
          <form>
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Enter Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />

            <div className="user-type-selector">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={handleRoleChange}
                />
                Rider
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="driver"
                  checked={role === "driver"}
                  onChange={handleRoleChange}
                />
                Driver
              </label>
            </div>

            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
