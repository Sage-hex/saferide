// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faMapMarkerAlt, 
//   faRoute, 
//   faCoins, 
//   faClock, 
//   faUser, 
//   faCheck, 
//   faTimes,
//   faMapMarkedAlt,
//   faInfoCircle
// } from '@fortawesome/free-solid-svg-icons';
// import styles from './RideRequestCard.module.css';

// const RideRequestCard = ({ request, onAccept, onReject }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   // Handle accept with loading state
//   const handleAccept = async () => {
//     setProcessing(true);
//     try {
//       await onAccept(request.id);
//     } catch (error) {
//       console.error("Error accepting ride:", error); 
//       setProcessing(false);
//     }
//   };

//   // Handle reject with loading state
//   const handleReject = async () => {
//     setProcessing(true);
//     try {
//       await onReject(request.id);
//     } catch (error) {
//       console.error("Error rejecting ride:", error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className={`${styles.rideRequestCard} card`}>
//       <div className={styles.passengerInfo}>
//         <div className={styles.avatarPlaceholder}>
//           <FontAwesomeIcon icon={faUser} />
//         </div>
//         {request.passengerName && <p className={styles.passengerName}>{request.passengerName}</p>}
//         <button 
//           className={styles.detailsToggle}
//           onClick={() => setShowDetails(!showDetails)}
//         >
//           <FontAwesomeIcon icon={faInfoCircle} /> {showDetails ? 'Hide Details' : 'View Details'}
//         </button>
//       </div>
      
//       <div className={styles.locationDetails}>
//         <div className={styles.locationItem}>
//           <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
//           <p className={styles.locationText}><strong>Pickup:</strong> {request.pickupLocation || 'Loading...'}</p>
//         </div>
//         <div className={styles.locationItem}>
//           <FontAwesomeIcon icon={faRoute} className={styles.icon} />
//           <p className={styles.locationText}><strong>Destination:</strong> {request.destination || 'Loading...'}</p>
//         </div>
//       </div>
      
//       <div className={styles.detailsFlex}>
//         <div className={styles.fareDetails}>
//           <FontAwesomeIcon icon={faCoins} className={styles.icon} />
//           <p className={styles.fareAmount}>${request.estimatedFare?.toFixed(2) || 'Calculating...'}</p>
//         </div>
        
//         {request.pickupTime && (
//           <div className={styles.timeDetails}>
//             <FontAwesomeIcon icon={faClock} className={styles.icon} />
//             <p className={styles.timeText}>
//               {request.pickupTime?.toDate 
//                 ? new Date(request.pickupTime.toDate()).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
//                 : new Date(request.pickupTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
//             </p>
//           </div>
//         )}
//       </div>
      
//       {showDetails && (
//         <div className={styles.additionalDetails}>
//           <div className={styles.detailItem}>
//             <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon} />
//             <p><strong>Distance:</strong> {request.estimatedDistance || '~'} miles</p>
//           </div>
//           <div className={styles.detailItem}>
//             <FontAwesomeIcon icon={faClock} className={styles.icon} />
//             <p><strong>Duration:</strong> {request.estimatedDuration || '~'} min</p>
//           </div>
//           {request.passengerRating && (
//             <div className={styles.detailItem}>
//               <FontAwesomeIcon icon={faUser} className={styles.icon} />
//               <p><strong>Passenger Rating:</strong> {request.passengerRating}</p>
//             </div>
//           )}
//           {request.paymentMethod && (
//             <div className={styles.detailItem}>
//               <FontAwesomeIcon icon={faCoins} className={styles.icon} />
//               <p><strong>Payment:</strong> {request.paymentMethod}</p>
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className={styles.actions}>
//         <button 
//           className={`${styles.acceptButton} primary`} 
//           onClick={handleAccept}
//           disabled={processing}
//         >
//           <FontAwesomeIcon icon={faCheck} /> {processing ? 'Processing...' : 'Accept'}
//         </button>
//         <button 
//           className={`${styles.rejectButton} secondary`} 
//           onClick={handleReject}
//           disabled={processing}
//         >
//           <FontAwesomeIcon icon={faTimes} /> {processing ? 'Processing...' : 'Reject'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RideRequestCard;




// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMapMarkerAlt,
//   faRoute,
//   faCoins,
//   faClock,
//   faUser,
//   faCheck,
//   faTimes,
//   faMapMarkedAlt,
//   faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import styles from "./RideRequestCard.module.css";

// const RideRequestCard = ({ request, onAccept, onReject }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   const handleAccept = async () => {
//     setProcessing(true);
//     try {
//       await onAccept(request.id);
//     } catch (error) {
//       console.error("Error accepting ride:", error);
//       setProcessing(false);
//     }
//   };

//   const handleReject = async () => {
//     setProcessing(true);
//     try {
//       await onReject(request.id);
//     } catch (error) {
//       console.error("Error rejecting ride:", error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className={`${styles.rideRequestCard} card`}>
//       <div className={styles.passengerInfo}>
//         <div className={styles.avatarPlaceholder}>
//           <FontAwesomeIcon icon={faUser} />
//         </div>
//         {request.passengerName && <p className={styles.passengerName}>{request.passengerName}</p>}
//         <button
//           className={styles.detailsToggle}
//           onClick={() => setShowDetails(!showDetails)}
//         >
//           <FontAwesomeIcon icon={faInfoCircle} /> {showDetails ? "Hide Details" : "View Details"}
//         </button>
//       </div>

//       <div className={styles.locationDetails}>
//         <div className={styles.locationItem}>
//           <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
//           <p className={styles.locationText}>
//             <strong>Pickup:</strong> {request.origin.lat}, {request.origin.lng}
//           </p>
//         </div>
//         <div className={styles.locationItem}>
//           <FontAwesomeIcon icon={faRoute} className={styles.icon} />
//           <p className={styles.locationText}>
//             <strong>Destination:</strong> {request.destination.lat}, {request.destination.lng}
//           </p>
//         </div>
//       </div>

//       <div className={styles.detailsFlex}>
//         <div className={styles.fareDetails}>
//           <FontAwesomeIcon icon={faCoins} className={styles.icon} />
//           <p className={styles.fareAmount}>${request.estimatedFare?.toFixed(2) || "Calculating..."}</p>
//         </div>

//         {request.pickupTime && (
//           <div className={styles.timeDetails}>
//             <FontAwesomeIcon icon={faClock} className={styles.icon} />
//             <p className={styles.timeText}>
//               {new Date(request.pickupTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
//             </p>
//           </div>
//         )}
//       </div>

//       {showDetails && (
//         <div className={styles.additionalDetails}>
//           <div className={styles.detailItem}>
//             <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon} />
//             <p>
//               <strong>Distance:</strong> {request.estimatedDistance || "~"} miles
//             </p>
//           </div>
//           <div className={styles.detailItem}>
//             <FontAwesomeIcon icon={faClock} className={styles.icon} />
//             <p>
//               <strong>Duration:</strong> {request.estimatedDuration || "~"} min
//             </p>
//           </div>
//           {request.passengerRating && (
//             <div className={styles.detailItem}>
//               <FontAwesomeIcon icon={faUser} className={styles.icon} />
//               <p>
//                 <strong>Passenger Rating:</strong> {request.passengerRating}
//               </p>
//             </div>
//           )}
//           {request.paymentMethod && (
//             <div className={styles.detailItem}>
//               <FontAwesomeIcon icon={faCoins} className={styles.icon} />
//               <p>
//                 <strong>Payment:</strong> {request.paymentMethod}
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       <div className={styles.actions}>
//         <button
//           className={`${styles.acceptButton} primary`}
//           onClick={handleAccept}
//           disabled={processing}
//         >
//           <FontAwesomeIcon icon={faCheck} /> {processing ? "Processing..." : "Accept"}
//         </button>
//         <button
//           className={`${styles.rejectButton} secondary`}
//           onClick={handleReject}
//           disabled={processing}
//         >
//           <FontAwesomeIcon icon={faTimes} /> {processing ? "Processing..." : "Reject"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RideRequestCard;






import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faRoute,
  faCoins,
  faClock,
  faUser,
  faCheck,
  faTimes,
  faMapMarkedAlt,
  faInfoCircle,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RideRequestCard.module.css";

const RideRequestCard = ({ request, onAccept, onReject }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleAccept = async () => {
    setProcessing(true);
    try {
      await onAccept(request.id);
    } catch (error) {
      console.error("Error accepting ride:", error);
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    setProcessing(true);
    try {
      await onReject(request.id);
    } catch (error) {
      console.error("Error rejecting ride:", error);
      setProcessing(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.starFilled} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.starHalf} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.starEmpty} />);
      }
    }
    
    return stars;
  };

  return (
    <div className={`${styles.rideRequestCard} card`}>
      <div className={styles.passengerInfo}>
        <div className={styles.avatarPlaceholder}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={styles.passengerDetails}>
          <p className={styles.passengerName}>{request.passengerName || "Passenger"}</p>
          {request.passengerRating && (
            <div className={styles.rating}>
              {renderStars(request.passengerRating)}
              <span>({request.passengerRating.toFixed(1)})</span>
            </div>
          )}
        </div>
        <button
          className={styles.detailsToggle}
          onClick={() => setShowDetails(!showDetails)}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>

      <div className={styles.locationDetails}>
        <div className={styles.locationItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
          <p className={styles.locationText}>
            <strong>Pickup:</strong> {request.pickupAddress || `${request.origin.lat}, ${request.origin.lng}`}
          </p>
        </div>
        <div className={styles.locationItem}>
          <FontAwesomeIcon icon={faRoute} className={styles.icon} />
          <p className={styles.locationText}>
            <strong>Destination:</strong> {request.destinationAddress || `${request.destination.lat}, ${request.destination.lng}`}
          </p>
        </div>
      </div>

      <div className={styles.detailsFlex}>
        <div className={styles.fareDetails}>
          <FontAwesomeIcon icon={faCoins} className={styles.icon} />
          <p className={styles.fareAmount}>
            ${request.estimatedFare?.toFixed(2) || "Calculating..."}
          </p>
        </div>

        {request.pickupTime && (
          <div className={styles.timeDetails}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <p className={styles.timeText}>
              {new Date(request.pickupTime).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
      </div>

      {showDetails && (
        <div className={styles.additionalDetails}>
          <div className={styles.detailItem}>
            <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon} />
            <p>
              <strong>Distance:</strong> {request.estimatedDistance?.toFixed(1) || "~"} miles
            </p>
          </div>
          <div className={styles.detailItem}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <p>
              <strong>Duration:</strong> {request.estimatedDuration || "~"} min
            </p>
          </div>
          {request.paymentMethod && (
            <div className={styles.detailItem}>
              <FontAwesomeIcon icon={faCoins} className={styles.icon} />
              <p>
                <strong>Payment:</strong> {request.paymentMethod}
              </p>
            </div>
          )}
          {request.notes && (
            <div className={styles.detailItem}>
              <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
              <p>
                <strong>Notes:</strong> {request.notes}
              </p>
            </div>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <button
          className={`${styles.acceptButton} primary`}
          onClick={handleAccept}
          disabled={processing}
        >
          <FontAwesomeIcon icon={faCheck} /> {processing ? "Processing..." : "Accept"}
        </button>
        <button
          className={`${styles.rejectButton} secondary`}
          onClick={handleReject}
          disabled={processing}
        >
          <FontAwesomeIcon icon={faTimes} /> {processing ? "Processing..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default RideRequestCard;