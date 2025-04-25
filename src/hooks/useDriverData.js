// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { 
//   collection, 
//   query, 
//   where, 
//   onSnapshot, 
//   doc, 
//   getDoc,
//   updateDoc
// } from "firebase/firestore";

// const useDriverData = () => {
//   const [driverData, setDriverData] = useState({
//     isAvailable: false,
//     currentRideRequest: null,
//     currentTrip: null,
//     tripHistory: [],
//     earnings: { today: 0, week: 0, total: 0 },
//     notifications: [],
//     driverProfile: null,
//     loadingRequests: true,
//     loadingHistory: true,
//     error: null
//   });

//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           // Fetch driver profile
//           const profileRef = doc(db, "drivers", user.uid);
//           const profileSnap = await getDoc(profileRef);
          
//           if (profileSnap.exists()) {
//             const profileData = profileSnap.data();
//             setDriverData(prev => ({
//               ...prev,
//               driverProfile: profileData,
//               isAvailable: profileData.availability || false
//             }));
//           }

//           // Set up real-time listeners
//           const rideRequestQuery = query(
//             collection(db, "rideRequests"),
//             where("status", "==", "pending"),
//             where("driverId", "==", user.uid)
//           );

//           const unsubscribeRequests = onSnapshot(rideRequestQuery, (snapshot) => {
//             const requests = snapshot.docs.map(doc => ({
//               id: doc.id,
//               ...doc.data()
//             }));
            
//             setDriverData(prev => ({
//               ...prev,
//               currentRideRequest: requests[0] || null,
//               loadingRequests: false
//             }));
//           });

//           const activeTripQuery = query(
//             collection(db, "trips"),
//             where("driverId", "==", user.uid),
//             where("status", "in", ["accepted", "in-progress"])
//           );

//           const unsubscribeActiveTrip = onSnapshot(activeTripQuery, (snapshot) => {
//             const trips = snapshot.docs.map(doc => ({
//               id: doc.id,
//               ...doc.data()
//             }));
            
//             setDriverData(prev => ({
//               ...prev,
//               currentTrip: trips[0] || null
//             }));
//           });

//           const tripHistoryQuery = query(
//             collection(db, "trips"),
//             where("driverId", "==", user.uid),
//             where("status", "==", "completed")
//           );

//           const unsubscribeHistory = onSnapshot(tripHistoryQuery, (snapshot) => {
//             const history = snapshot.docs.map(doc => ({
//               id: doc.id,
//               ...doc.data()
//             }));
            
//             // Calculate earnings
//             const todayEarnings = calculateTodayEarnings(history);
//             const weekEarnings = calculateWeeklyEarnings(history);
//             const totalEarnings = calculateTotalEarnings(history);
            
//             setDriverData(prev => ({
//               ...prev,
//               tripHistory: history,
//               earnings: {
//                 today: todayEarnings,
//                 week: weekEarnings,
//                 total: totalEarnings
//               },
//               loadingHistory: false
//             }));
//           });

//           return () => {
//             unsubscribeRequests();
//             unsubscribeActiveTrip();
//             unsubscribeHistory();
//           };
//         } catch (error) {
//           setDriverData(prev => ({
//             ...prev,
//             error: error.message,
//             loadingRequests: false,
//             loadingHistory: false
//           }));
//         }
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   const setAvailability = async (isAvailable) => {
//     try {
//       if (!auth.currentUser) return;
      
//       const driverRef = doc(db, "drivers", auth.currentUser.uid);
//       await updateDoc(driverRef, {
//         availability: isAvailable
//       });
      
//       setDriverData(prev => ({ ...prev, isAvailable }));
//     } catch (error) {
//       console.error("Error updating availability:", error);
//       setDriverData(prev => ({ ...prev, error: error.message }));
//     }
//   };

//   const acceptRideRequest = async (requestId) => {
//     try {
//       if (!auth.currentUser) return;
      
//       // Update ride request status
//       const requestRef = doc(db, "rideRequests", requestId);
//       await updateDoc(requestRef, {
//         status: "accepted",
//         driverId: auth.currentUser.uid
//       });
      
//       // Create new trip
//       const tripRef = doc(collection(db, "trips"));
//       await setDoc(tripRef, {
//         id: tripRef.id,
//         ...driverData.currentRideRequest,
//         status: "accepted",
//         driverId: auth.currentUser.uid,
//         startTime: new Date()
//       });
      
//       setDriverData(prev => ({
//         ...prev,
//         currentRideRequest: null,
//         currentTrip: {
//           id: tripRef.id,
//           ...driverData.currentRideRequest,
//           status: "accepted"
//         }
//       }));
//     } catch (error) {
//       console.error("Error accepting ride:", error);
//       setDriverData(prev => ({ ...prev, error: error.message }));
//     }
//   };

//   const rejectRideRequest = async (requestId) => {
//     try {
//       const requestRef = doc(db, "rideRequests", requestId);
//       await updateDoc(requestRef, {
//         status: "rejected"
//       });
      
//       setDriverData(prev => ({
//         ...prev,
//         currentRideRequest: null
//       }));
//     } catch (error) {
//       console.error("Error rejecting ride:", error);
//       setDriverData(prev => ({ ...prev, error: error.message }));
//     }
//   };

//   const completeTrip = async (tripId) => {
//     try {
//       const tripRef = doc(db, "trips", tripId);
//       await updateDoc(tripRef, {
//         status: "completed",
//         endTime: new Date()
//       });
      
//       setDriverData(prev => ({
//         ...prev,
//         currentTrip: null
//       }));
//     } catch (error) {
//       console.error("Error completing trip:", error);
//       setDriverData(prev => ({ ...prev, error: error.message }));
//     }
//   };

//   // Helper functions for earnings calculation
//   const calculateTodayEarnings = (trips) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     return trips
//       .filter(trip => new Date(trip.endTime?.toDate()).toDateString() === today.toDateString())
//       .reduce((sum, trip) => sum + (trip.fare || 0), 0);
//   };

//   const calculateWeeklyEarnings = (trips) => {
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
//     return trips
//       .filter(trip => new Date(trip.endTime?.toDate()) > oneWeekAgo)
//       .reduce((sum, trip) => sum + (trip.fare || 0), 0);
//   };

//   const calculateTotalEarnings = (trips) => {
//     return trips.reduce((sum, trip) => sum + (trip.fare || 0), 0);
//   };

//   return {
//     ...driverData,
//     setAvailability,
//     acceptRideRequest,
//     rejectRideRequest,
//     completeTrip
//   };
// };

// export default useDriverData;


// src/hooks/useDriverData.js
import { useEffect, useState } from "react";
import { 
  auth,
  db,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  onAuthStateChanged
} from "../firebase";

const useDriverData = () => {
  const [driverData, setDriverData] = useState({
    isAvailable: false,
    currentRideRequest: null,
    currentTrip: null,
    tripHistory: [],
    earnings: { today: 0, week: 0, total: 0 },
    notifications: [],
    driverProfile: null,
    loadingRequests: true,
    loadingHistory: true,
    error: null
  });

  // Calculate earnings helper functions
  const calculateTodayEarnings = (trips) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return trips
      .filter(trip => trip.endTime?.toDate() >= today)
      .reduce((sum, trip) => sum + (trip.fare || 0), 0);
  };

  const calculateWeeklyEarnings = (trips) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return trips
      .filter(trip => trip.endTime?.toDate() >= oneWeekAgo)
      .reduce((sum, trip) => sum + (trip.fare || 0), 0);
  };

  const calculateTotalEarnings = (trips) => {
    return trips.reduce((sum, trip) => sum + (trip.fare || 0), 0);
  };

  const setAvailability = async (isAvailable) => {
    try {
      if (!auth.currentUser) return;
      
      const driverRef = doc(db, "drivers", auth.currentUser.uid);
      await setDoc(driverRef, {
        availability: isAvailable,
        lastUpdated: serverTimestamp()
      }, { merge: true });
      
      setDriverData(prev => ({ ...prev, isAvailable }));
    } catch (error) {
      console.error("Error updating availability:", error);
      setDriverData(prev => ({ ...prev, error: error.message }));
    }
  };

  const acceptRideRequest = async (requestId) => {
    try {
      if (!auth.currentUser) return;
      
      // Update ride request status
      const requestRef = doc(db, "rideRequests", requestId);
      await updateDoc(requestRef, {
        status: "accepted",
        driverId: auth.currentUser.uid,
        acceptedAt: serverTimestamp()
      });
      
      // Create new trip document
      const tripRef = doc(collection(db, "trips"));
      await setDoc(tripRef, {
        id: tripRef.id,
        ...driverData.currentRideRequest,
        status: "accepted",
        driverId: auth.currentUser.uid,
        startTime: serverTimestamp()
      });
      
      setDriverData(prev => ({
        ...prev,
        currentRideRequest: null,
        currentTrip: {
          id: tripRef.id,
          ...driverData.currentRideRequest,
          status: "accepted",
          driverId: auth.currentUser.uid
        }
      }));
    } catch (error) {
      console.error("Error accepting ride:", error);
      setDriverData(prev => ({ ...prev, error: error.message }));
    }
  };

  const rejectRideRequest = async (requestId) => {
    try {
      const requestRef = doc(db, "rideRequests", requestId);
      await updateDoc(requestRef, {
        status: "rejected",
        rejectedAt: serverTimestamp()
      });
      
      setDriverData(prev => ({
        ...prev,
        currentRideRequest: null
      }));
    } catch (error) {
      console.error("Error rejecting ride:", error);
      setDriverData(prev => ({ ...prev, error: error.message }));
    }
  };

  const completeTrip = async (tripId) => {
    try {
      const tripRef = doc(db, "trips", tripId);
      await updateDoc(tripRef, {
        status: "completed",
        endTime: serverTimestamp()
      });
      
      setDriverData(prev => ({
        ...prev,
        currentTrip: null
      }));
    } catch (error) {
      console.error("Error completing trip:", error);
      setDriverData(prev => ({ ...prev, error: error.message }));
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Initialize driver document
          const driverRef = doc(db, "drivers", user.uid);
          await setDoc(driverRef, {
            uid: user.uid,
            availability: false,
            lastUpdated: serverTimestamp()
          }, { merge: true });

          // Get driver profile
          const profileSnap = await getDoc(driverRef);
          if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            setDriverData(prev => ({
              ...prev,
              driverProfile: profileData,
              isAvailable: profileData.availability || false
            }));
          }

          // Set up real-time listeners
          const rideRequestQuery = query(
            collection(db, "rideRequests"),
            where("status", "==", "pending"),
            where("driverId", "==", null),
            orderBy("createdAt", "desc"),
            limit(1)
          );

          const unsubscribeRequests = onSnapshot(rideRequestQuery, (snapshot) => {
            const requests = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
            setDriverData(prev => ({
              ...prev,
              currentRideRequest: requests[0] || null,
              loadingRequests: false
            }));
          });

          const activeTripQuery = query(
            collection(db, "trips"),
            where("driverId", "==", user.uid),
            where("status", "in", ["accepted", "in-progress"])
          );

          const unsubscribeActiveTrip = onSnapshot(activeTripQuery, (snapshot) => {
            const trips = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
            setDriverData(prev => ({
              ...prev,
              currentTrip: trips[0] || null
            }));
          });

          const tripHistoryQuery = query(
            collection(db, "trips"),
            where("driverId", "==", user.uid),
            where("status", "==", "completed"),
            orderBy("endTime", "desc")
          );

          const unsubscribeHistory = onSnapshot(tripHistoryQuery, (snapshot) => {
            const history = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
            setDriverData(prev => ({
              ...prev,
              tripHistory: history,
              earnings: {
                today: calculateTodayEarnings(history),
                week: calculateWeeklyEarnings(history),
                total: calculateTotalEarnings(history)
              },
              loadingHistory: false
            }));
          });

          return () => {
            unsubscribeRequests();
            unsubscribeActiveTrip();
            unsubscribeHistory();
          };
        } catch (error) {
          console.error("Error initializing driver data:", error);
          setDriverData(prev => ({
            ...prev,
            error: error.message,
            loadingRequests: false,
            loadingHistory: false
          }));
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return {
    ...driverData,
    setAvailability,
    acceptRideRequest,
    rejectRideRequest,
    completeTrip
  };
};

export default useDriverData;