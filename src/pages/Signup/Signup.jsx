import React, { useState } from "react";
import "./Signup.css";
import driverImage from "../../assets/driver.png";
import { auth, db } from "../../firebase"; // Make sure this is set up correctly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        uid: user.uid,
      });

      toast.success("Signup successful!");
      // Optionally redirect user here
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image-section">
        <img src={driverImage} alt="Driver" className="signup-image" />
      </div>

      <div className="signup-form-section">
        <div className="signup-form-wrapper">
          <h2>Create an account with SafeRide</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

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
