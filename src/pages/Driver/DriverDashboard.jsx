// import React from "react";
// import useDriverData from "../../hooks/useDriverData";
// import RideRequestCard from "../../components/RideRequest/RideRequestCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import "./DriverDashboard.css";

// const DriverDashboard = () => {
//   const {
//     rideRequests,
//     loadingRequests,
//     error,
//     acceptRideRequest,
//     rejectRideRequest,
//   } = useDriverData();

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">Driver Dashboard</h2>

//       {error && <p className="error-message">Error: {error}</p>}

//       <h3 className="section-title">Ride Requests</h3>
//       {loadingRequests ? (
//         <div className="loading-indicator">
//           <FontAwesomeIcon icon={faSpinner} spin /> Loading ride requests...
//         </div>
//       ) : rideRequests.length > 0 ? (
//         <ul className="ride-requests-list">
//           {rideRequests.map((request) => (
//             <li key={request.id} className="ride-request-item">
//               <RideRequestCard
//                 request={request}
//                 onAccept={() => acceptRideRequest(request.id, "driver123")} // Replace "driver123" with the actual driver ID
//                 onReject={() => rejectRideRequest(request.id)}
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className="empty-state">No new ride requests at the moment.</div>
//       )}
//     </div>
//   );
// };

// export default DriverDashboard;


import React from "react";
import useDriverData from "../../hooks/useDriverData";
import RideRequestCard from "../../components/RideRequest/RideRequestCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const DriverDashboard = () => {
  const { rideRequests, loadingRequests, error } = useDriverData();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Driver Dashboard</h2>

      {error && <p className="error-message">Error: {error}</p>}

      <h3 className="section-title">Ride Requests</h3>
      {loadingRequests ? (
        <div className="loading-indicator">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading ride requests...
        </div>
      ) : rideRequests.length > 0 ? (
        <ul className="ride-requests-list">
          {rideRequests.map((request) => (
            <li key={request.id} className="ride-request-item">
              <RideRequestCard request={request} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">No new ride requests at the moment.</div>
      )}
    </div>
  );
};

export default DriverDashboard;