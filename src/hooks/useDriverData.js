// import { useEffect, useState } from 'react';
// import useDriverStore from '../store/driverStore';

// const useDriverData = () => {
//   const { initializeDashboard, resetDashboard } = useDriverStore();
//   const [unsubscribers, setUnsubscribers] = useState([]);

//   useEffect(() => {
//     // Initialize dashboard data and store unsubscribers
//     const listeners = initializeDashboard();
//     setUnsubscribers(listeners);

//     // Cleanup function
//     return () => {
//       resetDashboard();
//       unsubscribers.forEach(unsub => {
//         if (typeof unsub === 'function') {
//           unsub(); // Unsubscribe from Firestore listeners
//         }
//       });
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Use the current driver store state
//   const driverState = useDriverStore((state) => state);

//   // Add connectivity data for ride booking integration
//   const enhancedDriverState = {
//     ...driverState,
    
//     // Method to check if driver can accept new requests
//     canAcceptRequests: () => {
//       return driverState.isAvailable && !driverState.currentTrip;
//     },
    
//     // Method to estimate driver's arrival time to pickup
//     estimateArrivalTime: (pickupLocation) => {
//       // This would ideally use a mapping service to calculate ETA
//       // For now returning a placeholder
//       return "10-15 minutes";
//     },
    
//     // Method to check driver's proximity to passenger areas
//     checkProximityToHotspots: () => {
//       // This would check if driver is in a high-demand area
//       return true;
//     }
//   };

//   return enhancedDriverState;
// };

// export default useDriverData;

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path to your Firebase config
import { toast } from "react-toastify";

const useDriverData = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "rideRequests"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRideRequests(requests);
        setLoadingRequests(false);
      },
      (error) => {
        console.error("Error fetching ride requests:", error);
        setError("Failed to load ride requests.");
        setLoadingRequests(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const acceptRideRequest = async (requestId, driverId) => {
    try {
      const requestRef = doc(db, "rideRequests", requestId);
      await updateDoc(requestRef, {
        status: "accepted",
        driverId,
      });
      toast.success("Ride request accepted!");
    } catch (error) {
      console.error("Error accepting ride request:", error);
      toast.error("Failed to accept ride request.");
    }
  };

  const rejectRideRequest = async (requestId) => {
    try {
      const requestRef = doc(db, "rideRequests", requestId);
      await updateDoc(requestRef, {
        status: "rejected",
      });
      toast.info("Ride request rejected.");
    } catch (error) {
      console.error("Error rejecting ride request:", error);
      toast.error("Failed to reject ride request.");
    }
  };

  return {
    rideRequests,
    loadingRequests,
    error,
    acceptRideRequest,
    rejectRideRequest,
  };
};

export default useDriverData;