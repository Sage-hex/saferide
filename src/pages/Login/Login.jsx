import React, { useState } from "react";
import "./Login.css";
import driverImage from "../../assets/driver.png"; // Same image or replace with another

const Login = () => {
  const [role, setRole] = useState("user");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={driverImage} alt="Driver" className="login-image" />
      </div>

      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h2>Welcome back to SafeRide</h2>
          <form>
            <input type="email" placeholder="Enter Email" />
            <input type="password" placeholder="Password" />

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

            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
