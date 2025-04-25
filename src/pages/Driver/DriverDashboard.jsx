// import React from 'react';
// import useDriverData from '../../hooks/useDriverData';
// import RideRequestCard from '../../components/RideRequest/RideRequestCard';
// import CurrentTrip from '../../components/CurrentTrip/CurrentTrip';
// import TripHistoryItem from '../../components/TripHistory/TripHistoryItem';
// import AvailabilityToggle from '../../components/AvailabilityToggle/AvailabilityToggle';
// import EarningsSummary from '../../components/EarningSummary/EarningsSummary';
// import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
// import NotificationItem from '../../components/Notifications/NotificationItem';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import './DriverDashboard.css';  // Import the CSS file

// const DriverDashboard = () => {
//   const driverData = useDriverData();
//   const {
//     isAvailable,
//     currentRideRequest,
//     currentTrip,
//     tripHistory,
//     earnings,
//     notifications,
//     driverProfile,
//     loadingRequests,
//     loadingHistory,
//     error,
//     setAvailability,
//     acceptRideRequest,
//     rejectRideRequest,
//   } = driverData;

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">Driver Dashboard</h2>

//       {error && <p className="error-message">Error: {error}</p>}

//       <div className="dashboard-flex">
//         <AvailabilityToggle isAvailable={isAvailable} onToggle={setAvailability} />
//         <EarningsSummary earnings={earnings} />
//         {driverProfile && <ProfileInfo profile={driverProfile} />}
//       </div>

//       <h3 className="section-title">Ride Requests</h3>
//       {loadingRequests ? (
//         <div className="loading-indicator">
//           <FontAwesomeIcon icon={faSpinner} spin /> Loading ride requests...
//         </div>
//       ) : currentRideRequest ? (
//         <RideRequestCard
//           request={currentRideRequest}
//           onAccept={acceptRideRequest}
//           onReject={rejectRideRequest}
//         />
//       ) : (
//         <div className="empty-state">
//           {isAvailable ? 'No new ride requests at the moment.' : 'Set yourself as available to receive ride requests.'}
//         </div>
//       )}

//       {currentTrip && (
//         <>
//           <h3 className="section-title">Current Trip</h3>
//           <CurrentTrip trip={currentTrip} />
//         </>
//       )}

//       <h3 className="section-title">Trip History</h3>
//       {loadingHistory ? (
//         <div className="loading-indicator">
//           <FontAwesomeIcon icon={faSpinner} spin /> Loading trip history...
//         </div>
//       ) : (
//         <ul className="trip-history-list">
//           {tripHistory.map((trip) => (
//             <li key={trip.id} className="trip-history-item">
//               <TripHistoryItem trip={trip} />
//             </li>
//           ))}
//           {tripHistory.length === 0 && (
//             <div className="empty-state">No completed trips yet.</div>
//           )}
//         </ul>
//       )}

//       {notifications.length > 0 && (
//         <>
//           <h3 className="section-title">Notifications</h3>
//           <ul className="notification-list">
//             {notifications.map((notification) => (
//               <li key={notification.id} className="notification-item">
//                 <NotificationItem notification={notification} />
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default DriverDashboard;



// import React from 'react';
// import useDriverData from '../../hooks/useDriverData';
// import RideRequestCard from '../../components/RideRequest/RideRequestCard';
// import CurrentTrip from '../../components/CurrentTrip/CurrentTrip';
// import TripHistoryItem from '../../components/TripHistory/TripHistoryItem';
// import AvailabilityToggle from '../../components/AvailabilityToggle/AvailabilityToggle';
// import EarningsSummary from '../../components/EarningSummary/EarningsSummary';
// import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
// import NotificationItem from '../../components/Notifications/NotificationItem';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import './DriverDashboard.css';

// const DriverDashboard = () => {
//   const driverData = useDriverData();
//   const {
//     isAvailable,
//     currentRideRequest,
//     currentTrip,
//     tripHistory,
//     earnings,
//     notifications,
//     driverProfile,
//     loadingRequests,
//     loadingHistory,
//     error,
//     setAvailability,
//     acceptRideRequest,
//     rejectRideRequest,
//   } = driverData;

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">Driver Dashboard</h2>

//       {error && <p className="error-message">Error: {error}</p>}

//       <div className="dashboard-flex">
//         <AvailabilityToggle isAvailable={isAvailable} onToggle={setAvailability} />
//         <EarningsSummary earnings={earnings} />
//         {driverProfile && <ProfileInfo profile={driverProfile} />}
//       </div>

//       <h3 className="section-title">Ride Requests</h3>
//       {loadingRequests ? (
//         <div className="loading-indicator">
//           <FontAwesomeIcon icon={faSpinner} spin /> Loading ride requests...
//         </div>
//       ) : currentRideRequest ? (
//         <RideRequestCard
//           request={currentRideRequest}
//           onAccept={acceptRideRequest}
//           onReject={rejectRideRequest}
//         />
//       ) : (
//         <div className="empty-state">
//           {isAvailable ? 'No new ride requests at the moment.' : 'Set yourself as available to receive ride requests.'}
//         </div>
//       )}

//       {currentTrip && (
//         <>
//           <h3 className="section-title">Current Trip</h3>
//           <CurrentTrip trip={currentTrip} />
//         </>
//       )}

//       {/* <h3 className="section-title">Trip History</h3>
//       {loadingHistory ? (
//         <div className="loading-indicator">
//           <FontAwesomeIcon icon={faSpinner} spin /> Loading trip history...
//         </div>
//       ) : (
//         <ul className="trip-history-list">
//           {tripHistory.map((trip) => (
//             <li key={trip.id} className="trip-history-item">
//               <TripHistoryItem trip={trip} />
//             </li>
//           ))}
//           {tripHistory.length === 0 && (
//             <div className="empty-state">No completed trips yet.</div>
//           )}
//         </ul>
//       )}

//       {notifications.length > 0 && (
//         <>
//           <h3 className="section-title">Notifications</h3>
//           <ul className="notification-list">
//             {notifications.map((notification) => (
//               <li key={notification.id} className="notification-item">
//                 <NotificationItem notification={notification} />
//               </li>
//             ))}
//           </ul>
//         </>
//       )} */}

// <h3 className="section-title">Trip History</h3>
// {loadingHistory ? (
//   <div className="loading-indicator">
//     <FontAwesomeIcon icon={faSpinner} spin /> Loading trip history...
//   </div>
// ) : (
//   <ul className="trip-history-list">
//     {(tripHistory || []).map((trip) => ( // Add fallback to empty array
//       <li key={trip.id} className="trip-history-item">
//         <TripHistoryItem trip={trip} />
//       </li>
//     ))}
//     {tripHistory?.length === 0 && (
//       <div className="empty-state">No completed trips yet.</div>
//     )}
//   </ul>
// )}

// {notifications?.length > 0 && (
//   <>
//     <h3 className="section-title">Notifications</h3>
//     <ul className="notification-list">
//       {(notifications || []).map((notification) => ( // Add fallback to empty array
//         <li key={notification.id} className="notification-item">
//           <NotificationItem notification={notification} />
//         </li>
//       ))}
//     </ul>
//   </>
// )}
//     </div>
//   );
// };

// export default DriverDashboard;




import React from 'react';
import useDriverData from '../../hooks/useDriverData';
import RideRequestCard from '../../components/RideRequest/RideRequestCard';
import CurrentTrip from '../../components/CurrentTrip/CurrentTrip';
import TripHistoryItem from '../../components/TripHistory/TripHistoryItem';
import AvailabilityToggle from '../../components/AvailabilityToggle/AvailabilityToggle';
import EarningsSummary from '../../components/EarningSummary/EarningsSummary';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import NotificationItem from '../../components/Notifications/NotificationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const {
    isAvailable,
    currentRideRequest,
    currentTrip,
    tripHistory,
    earnings,
    notifications,
    driverProfile,
    loadingRequests,
    loadingHistory,
    error,
    setAvailability,
    acceptRideRequest,
    rejectRideRequest,
    completeTrip
  } = useDriverData();

  const handleEditProfile = () => {
    toast.info("Profile editing feature coming soon!");
  };

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Driver Dashboard</h2>

      <div className="dashboard-flex">
        <AvailabilityToggle 
          isAvailable={isAvailable} 
          onToggle={setAvailability} 
        />
        <EarningsSummary earnings={earnings} />
        {driverProfile && 
          <ProfileInfo 
            profile={driverProfile} 
            onEdit={handleEditProfile}
          />
        }
      </div>

      <h3 className="section-title">Ride Requests</h3>
      {loadingRequests ? (
        <div className="loading-indicator">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading ride requests...
        </div>
      ) : currentRideRequest ? (
        <RideRequestCard
          request={currentRideRequest}
          onAccept={acceptRideRequest}
          onReject={rejectRideRequest}
        />
      ) : (
        <div className="empty-state">
          {isAvailable 
            ? 'No new ride requests at the moment.' 
            : 'Set yourself as available to receive ride requests.'}
        </div>
      )}

      {currentTrip && (
        <>
          <h3 className="section-title">Current Trip</h3>
          <CurrentTrip 
            trip={currentTrip} 
            onCompleteTrip={completeTrip}
          />
        </>
      )}

      <h3 className="section-title">Trip History</h3>
      {loadingHistory ? (
        <div className="loading-indicator">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading trip history...
        </div>
      ) : (
        <ul className="trip-history-list">
          {tripHistory.map((trip) => (
            <li key={trip.id} className="trip-history-item">
              <TripHistoryItem trip={trip} />
            </li>
          ))}
          {tripHistory.length === 0 && (
            <div className="empty-state">No completed trips yet.</div>
          )}
        </ul>
      )}

      {notifications.length > 0 && (
        <>
          <h3 className="section-title">Notifications</h3>
          <ul className="notification-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <NotificationItem notification={notification} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DriverDashboard;