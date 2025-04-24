// import React, { useState } from "react";
// import "./Login.css";
// import driverImage from "../../assets/driver.png";
// import { auth, db } from "../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [role, setRole] = useState("user");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRoleChange = (e) => {
//     setRole(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         const data = userSnap.data();

//         if (data.role !== role) {
//           toast.error(`You are not registered as a ${role}.`);
//           return;
//         }

//         toast.success("Login successful!");
//         // Redirect logic here
//       } else {
//         toast.error("No user data found.");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image-section">
//         <img src={driverImage} alt="Driver" className="login-image" />
//       </div>

//       <div className="login-form-section">
//         <div className="login-form-wrapper">
//           <h2>Welcome back to SafeRide</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <div className="user-type-selector">
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="user"
//                   checked={role === "user"}
//                   onChange={handleRoleChange}
//                 />
//                 Rider
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="driver"
//                   checked={role === "driver"}
//                   onChange={handleRoleChange}
//                 />
//                 Driver
//               </label>
//             </div>

//             <button type="submit">Log in</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import "./Login.css";
import driverImage from "../../assets/driver.png";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

const Login = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        if (data.role !== role) {
          toast.error(`You are not registered as a ${role}.`);
          setLoading(false); // Set loading back to false on error
          return;
        }

        toast.success("Login successful!");
        setLoading(false); // Set loading back to false on success
        // Redirect logic based on role
        if (role === "user") {
          navigate("/ride"); // Redirect rider
        } else if (role === "driver") {
          navigate("/driver/dashboard"); // Redirect driver (adjust path as needed)
        }
      } else {
        toast.error("No user data found.");
        setLoading(false); // Set loading back to false on error
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false); // Set loading back to false on error
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={driverImage} alt="Driver" className="login-image" />
      </div>

      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h2>Welcome back to SafeRide</h2>
          <form onSubmit={handleSubmit}>
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

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link> {/* Add a link for password reset */}
          </p>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;