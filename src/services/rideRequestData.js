// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase"; // Adjust the path to your Firebase config

// export async function bookRide({ userId, origin, destination, pickupTime }) {
//   try {
//     const newRide = {
//       userId: userId,
//       driverId: null,
//       origin: origin,             // { lat: ..., lng: ... }
//       destination: destination,   // { lat: ..., lng: ... }
//       pickupTime: pickupTime,     // ISO string: new Date().toISOString()
//       status: "pending",
//       createdAt: serverTimestamp(),
//     };

//     const docRef = await addDoc(collection(db, "rideRequests"), newRide);
//     console.log("Ride booked successfully with ID:", docRef.id);
//     return docRef.id; // Return the document ID if needed
//   } catch (error) {
//     console.error("Error booking ride:", error);
//     throw error; // Re-throw the error for the caller to handle
//   }
// }


// rideBooking.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path to your Firebase config

/**
 * Books a ride and stores it in Firestore with all necessary fields for the driver UI.
 *
 * @param {Object} rideData
 * @param {string} rideData.userId - ID of the user booking the ride
 * @param {Object} rideData.origin - Pickup location { lat, lng, address (optional) }
 * @param {Object} rideData.destination - Drop-off location { lat, lng, address (optional) }
 * @param {string} rideData.pickupTime - ISO string time of pickup
 * @param {string} [rideData.passengerName] - Name of the passenger
 * @param {number} [rideData.estimatedFare] - Estimated fare amount
 * @param {string} [rideData.paymentMethod] - Payment type (e.g., 'cash', 'card')
 * @param {number} [rideData.estimatedDistance] - Estimated distance in miles
 * @param {number} [rideData.estimatedDuration] - Estimated duration in minutes
 * @param {number} [rideData.passengerRating] - Optional passenger rating
 */
export async function bookRide({
  userId,
  origin,
  destination,
  pickupTime,
  passengerName = "Anonymous",
  estimatedFare = 0,
  paymentMethod = "cash",
  estimatedDistance = null,
  estimatedDuration = null,
  passengerRating = null
}) {
  try {
    const newRide = {
      userId,
      driverId: null,
      origin,                   // e.g., { lat: 6.5244, lng: 3.3792 }
      destination,             // e.g., { lat: 6.6000, lng: 3.3500 }
      pickupTime,              // e.g., "2025-04-25T15:30:00Z"
      status: "pending",
      createdAt: serverTimestamp(),
      passengerName,
      estimatedFare,
      paymentMethod,
      estimatedDistance,
      estimatedDuration,
      passengerRating
    };

    const docRef = await addDoc(collection(db, "rideRequests"), newRide);
    console.log("✅ Ride booked successfully with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error booking ride:", error);
  }
}

export default bookRide;
