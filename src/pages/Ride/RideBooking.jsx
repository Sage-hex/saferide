import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebase"; // Using your existing Firebase import
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './RideBooking.css';

// You'll need to install: npm install @react-google-maps/api

const RideBooking = () => {
  // User states
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Ride booking states
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [rideDetails, setRideDetails] = useState(null);
  
  // Map states
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos, Nigeria
  const [directions, setDirections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    origin: null,
    destination: null
  });

  // Price calculation
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  
  // Auth listener - using your existing Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Get additional user data from Firestore
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      // You can add redirect here if needed
    } catch (error) {
      toast.error("Error signing out");
    }
  };
  
  // Handle ride booking
  const handleBookRide = (e) => {
    e.preventDefault();
    
    if (!location || !destination || !pickupTime) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Calculate directions if locations are selected
    if (selectedLocations.origin && selectedLocations.destination) {
      calculateRoute();
    }
    
    // Simulate booking confirmation
    const estimatedTimeMinutes = Math.floor(Math.random() * 15) + 5;
    const driverName = ["Maria", "John", "Ade", "Tunde", "Sarah"][Math.floor(Math.random() * 5)];
    const vehicleDetails = ["Toyota Camry", "Honda Accord", "Kia Rio", "Hyundai Elantra", "Toyota Corolla"][Math.floor(Math.random() * 5)];
    const vehicleColor = ["White", "Black", "Silver", "Blue", "Red"][Math.floor(Math.random() * 5)];
    const vehiclePlate = `LG-${Math.floor(100 + Math.random() * 900)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    
    setRideDetails({
      driverName,
      estimatedTimeMinutes,
      vehicleDetails,
      vehicleColor,
      vehiclePlate
    });
    
    toast.success("Ride booked successfully!");
    setBookingSubmitted(true);
  };
  
  // Map functions
  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };
  
  const handleMapClick = (e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();
    
    // Set location or destination based on which is empty first
    if (!selectedLocations.origin) {
      setSelectedLocations({
        ...selectedLocations,
        origin: { lat: clickedLat, lng: clickedLng }
      });
      setLocation("Selected on map");
    } else if (!selectedLocations.destination) {
      setSelectedLocations({
        ...selectedLocations,
        destination: { lat: clickedLat, lng: clickedLng }
      });
      setDestination("Selected on map");
      
      // Calculate route when both points are selected
      calculateRoute();
    }
  };
  
  const calculateRoute = () => {
    if (!selectedLocations.origin || !selectedLocations.destination) return;
    
    setIsLoading(true);
    
    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: selectedLocations.origin,
        destination: selectedLocations.destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          
          // Calculate estimated price based on distance
          const distance = result.routes[0].legs[0].distance.value / 1000; // in km
          const basePrice = 500; // Base price in local currency
          const pricePerKm = 150; // Price per km
          const calculatedPrice = basePrice + (distance * pricePerKm);
          
          setEstimatedPrice(Math.round(calculatedPrice));
        } else {
          console.error(`Directions request failed: ${status}`);
          toast.error("Could not calculate route. Please try again.");
        }
        
        setIsLoading(false);
      }
    );
  };
  
  const resetBooking = () => {
    setLocation('');
    setDestination('');
    setPickupTime('');
    setSelectedLocations({ origin: null, destination: null });
    setDirections(null);
    setBookingSubmitted(false);
    setRideDetails(null);
    setEstimatedPrice(null);
    toast.info("Ride cancelled");
  };

  return (
    <div className="ride-booking-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <h1>SafeRide</h1> {/* Changed to match your existing app name */}
        </div>
        {user && (
          <div className="user-menu">
            <span>Hi, {userData?.name || user.email}</span>
            <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </header>

      <div className="main-content">
        {!user ? (
          <div className="auth-message">
            <h2>Please Sign In</h2>
            <p>You need to sign in to book a ride with SafeRide.</p>
            {/* If you have router set up, you can add links to login/signup pages here */}
          </div>
        ) : (
          <div className="booking-map-container">
            {bookingSubmitted ? (
              <div className="booking-confirmation">
                <div className="confirmation-header">
                  <h2>Ride Confirmed!</h2>
                  <p className="success-message">Your driver is on the way</p>
                </div>
                
                <div className="driver-details">
                  <div className="driver-info">
                    <div className="driver-avatar">
                      <img src="/api/placeholder/60/60" alt="Driver" />
                    </div>
                    <div className="driver-name">
                      <h3>{rideDetails.driverName}</h3>
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-count">4.9</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="vehicle-info">
                    <div className="vehicle-details">
                      <p>{rideDetails.vehicleDetails}</p>
                      <p>{rideDetails.vehicleColor} • {rideDetails.vehiclePlate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="ride-info">
                  <div className="info-item">
                    <span className="info-label">Pickup</span>
                    <span className="info-value">{location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Destination</span>
                    <span className="info-value">{destination}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Pickup Time</span>
                    <span className="info-value">{pickupTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Est. Arrival</span>
                    <span className="info-value">{rideDetails.estimatedTimeMinutes} minutes</span>
                  </div>
                  {estimatedPrice && (
                    <div className="info-item price">
                      <span className="info-label">Est. Price</span>
                      <span className="info-value">₦{estimatedPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="trip-map">
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                      mapContainerClassName="confirmation-map"
                      center={center}
                      zoom={12}
                      onLoad={onMapLoad}
                    >
                      {selectedLocations.origin && (
                        <Marker 
                          position={selectedLocations.origin} 
                          label="A"
                        />
                      )}
                      {selectedLocations.destination && (
                        <Marker 
                          position={selectedLocations.destination} 
                          label="B"
                        />
                      )}
                      {directions && (
                        <DirectionsRenderer
                          directions={directions}
                          options={{
                            polylineOptions: {
                              strokeColor: "#4285F4",
                              strokeWeight: 5
                            }
                          }}
                        />
                      )}
                    </GoogleMap>
                  </LoadScript>
                </div>
                
                <div className="action-buttons">
                  <button className="contact-driver">
                    <span className="icon">📞</span> Contact Driver
                  </button>
                  <button className="cancel-ride" onClick={resetBooking}>
                    <span className="icon">✕</span> Cancel Ride
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="booking-form-container">
                  <div className="form-header">
                    <h2>Book Your Ride</h2>
                    {userData && userData.role === "user" && (
                      <p className="welcome-user">Welcome, {userData.name}</p>
                    )}
                    {estimatedPrice && (
                      <div className="price-estimate">
                        <p>Estimated price: <span className="price">₦{estimatedPrice.toLocaleString()}</span></p>
                      </div>
                    )}
                  </div>
                  
                  <form className="booking-form" onSubmit={handleBookRide}>
                    <div className="form-group">
                      <label htmlFor="location">Pickup Location</label>
                      <input 
                        id="location"
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter pickup location" 
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="destination">Destination</label>
                      <input 
                        id="destination"
                        type="text" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination" 
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="pickupTime">Pickup Time</label>
                      <input 
                        id="pickupTime"
                        type="datetime-local" 
                        value={pickupTime} 
                        onChange={(e) => setPickupTime(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-help">
                      <p>Click on the map to select pickup and destination points</p>
                    </div>
                    
                    <button type="submit" className="book-button" disabled={isLoading}>
                      {isLoading ? 'Calculating route...' : 'Book Ride Now'}
                    </button>
                  </form>
                </div>
                
                <div className="map-container">
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                      mapContainerClassName="google-map"
                      center={center}
                      zoom={12}
                      onLoad={onMapLoad}
                      onClick={handleMapClick}
                    >
                      {selectedLocations.origin && (
                        <Marker 
                          position={selectedLocations.origin} 
                          label="A"
                        />
                      )}
                      {selectedLocations.destination && (
                        <Marker 
                          position={selectedLocations.destination} 
                          label="B"
                        />
                      )}
                      {directions && (
                        <DirectionsRenderer
                          directions={directions}
                          options={{
                            polylineOptions: {
                              strokeColor: "#4285F4",
                              strokeWeight: 5
                            }
                          }}
                        />
                      )}
                    </GoogleMap>
                  </LoadScript>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>© 2025 SafeRide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RideBooking;


// import React, { useState, useEffect, useRef } from 'react';
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import './RideBooking.css';

// const mapContainerStyle = {
//   width: '100%',
//   height: '400px',
//   borderRadius: '8px'
// };

// const libraries = ["places"];

// const RideBooking = () => {
//   // User states
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
  
//   // Ride booking states
//   const [location, setLocation] = useState('');
//   const [destination, setDestination] = useState('');
//   const [pickupTime, setPickupTime] = useState('');
//   const [bookingSubmitted, setBookingSubmitted] = useState(false);
//   const [rideDetails, setRideDetails] = useState(null);
  
//   // Map states
//   const [center, setCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos, Nigeria
//   const [directions, setDirections] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedLocations, setSelectedLocations] = useState({
//     origin: null,
//     destination: null
//   });

//   // Price calculation
//   const [estimatedPrice, setEstimatedPrice] = useState(null);
  
//   // Map references
//   const mapRef = useRef(null);
  
//   // Load Google Maps API
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyC3Qgrekbej0f359gD52HoyoATbrJalTrI",
//     libraries
//   });

//   // Auth listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
        
//         // Get additional user data from Firestore
//         try {
//           const userRef = doc(db, "users", currentUser.uid);
//           const userSnap = await getDoc(userRef);
          
//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         setUser(null);
//         setUserData(null);
//       }
//     });
    
//     return () => unsubscribe();
//   }, []);
  
//   // Try to get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           setCenter(userLocation);
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//         }
//       );
//     }
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Signed out successfully");
//     } catch (error) {
//       toast.error("Error signing out");
//     }
//   };
  
//   // Handle ride booking
//   const handleBookRide = (e) => {
//     e.preventDefault();
    
//     if (!location || !destination || !pickupTime) {
//       toast.error("Please fill in all fields");
//       return;
//     }
    
//     // Calculate directions if locations are selected
//     if (selectedLocations.origin && selectedLocations.destination) {
//       calculateRoute();
//     }
    
//     // Simulate booking confirmation
//     const estimatedTimeMinutes = Math.floor(Math.random() * 15) + 5;
//     const driverName = ["Maria", "John", "Ade", "Tunde", "Sarah"][Math.floor(Math.random() * 5)];
//     const vehicleDetails = ["Toyota Camry", "Honda Accord", "Kia Rio", "Hyundai Elantra", "Toyota Corolla"][Math.floor(Math.random() * 5)];
//     const vehicleColor = ["White", "Black", "Silver", "Blue", "Red"][Math.floor(Math.random() * 5)];
//     const vehiclePlate = `LG-${Math.floor(100 + Math.random() * 900)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    
//     setRideDetails({
//       driverName,
//       estimatedTimeMinutes,
//       vehicleDetails,
//       vehicleColor,
//       vehiclePlate
//     });
    
//     toast.success("Ride booked successfully!");
//     setBookingSubmitted(true);
//   };
  
//   // Map functions
//   const onMapLoad = (map) => {
//     mapRef.current = map;
//   };
  
//   const handleMapClick = (e) => {
//     const clickedLat = e.latLng.lat();
//     const clickedLng = e.latLng.lng();
    
//     // Set location or destination based on which is empty first
//     if (!selectedLocations.origin) {
//       setSelectedLocations({
//         ...selectedLocations,
//         origin: { lat: clickedLat, lng: clickedLng }
//       });
//       setLocation("Selected on map");
//     } else if (!selectedLocations.destination) {
//       setSelectedLocations({
//         ...selectedLocations,
//         destination: { lat: clickedLat, lng: clickedLng }
//       });
//       setDestination("Selected on map");
      
//       // Calculate route when both points are selected
//       calculateRoute();
//     }
//   };
  
//   const calculateRoute = () => {
//     if (!selectedLocations.origin || !selectedLocations.destination || !isLoaded) return;
    
//     setIsLoading(true);
    
//     const directionsService = new window.google.maps.DirectionsService();
    
//     directionsService.route(
//       {
//         origin: selectedLocations.origin,
//         destination: selectedLocations.destination,
//         travelMode: window.google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
          
//           // Calculate estimated price based on distance
//           const distance = result.routes[0].legs[0].distance.value / 1000; // in km
//           const basePrice = 500; // Base price in local currency
//           const pricePerKm = 150; // Price per km
//           const calculatedPrice = basePrice + (distance * pricePerKm);
          
//           setEstimatedPrice(Math.round(calculatedPrice));
//         } else {
//           console.error(`Directions request failed: ${status}`);
//           toast.error("Could not calculate route. Please try again.");
//         }
        
//         setIsLoading(false);
//       }
//     );
//   };
  
//   const resetBooking = () => {
//     setLocation('');
//     setDestination('');
//     setPickupTime('');
//     setSelectedLocations({ origin: null, destination: null });
//     setDirections(null);
//     setBookingSubmitted(false);
//     setRideDetails(null);
//     setEstimatedPrice(null);
//     toast.info("Ride cancelled");
//   };

//   // Handle map loading errors
//   if (loadError) {
//     return (
//       <div className="map-error">
//         <h3>Error loading maps</h3>
//         <p>There was an error loading Google Maps. Please try again later.</p>
//         <code>{loadError.message}</code>
//       </div>
//     );
//   }

//   return (
//     <div className="ride-booking-container">
//       {/* Header */}
//       <header className="app-header">
//         <div className="logo">
//           <h1>SafeRide</h1>
//         </div>
//         {user && (
//           <div className="user-menu">
//             <span>Hi, {userData?.name || user.email}</span>
//             <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
//           </div>
//         )}
//       </header>

//       <div className="main-content">
//         {!user ? (
//           <div className="auth-message">
//             <h2>Please Sign In</h2>
//             <p>You need to sign in to book a ride with SafeRide.</p>
//           </div>
//         ) : (
//           <div className="booking-map-container">
//             {bookingSubmitted ? (
//               <div className="booking-confirmation">
//                 <div className="confirmation-header">
//                   <h2>Ride Confirmed!</h2>
//                   <p className="success-message">Your driver is on the way</p>
//                 </div>
                
//                 <div className="driver-details">
//                   <div className="driver-info">
//                     <div className="driver-avatar">
//                       <img src="/api/placeholder/60/60" alt="Driver" />
//                     </div>
//                     <div className="driver-name">
//                       <h3>{rideDetails.driverName}</h3>
//                       <div className="rating">
//                         <span className="stars">★★★★★</span>
//                         <span className="rating-count">4.9</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="vehicle-info">
//                     <div className="vehicle-details">
//                       <p>{rideDetails.vehicleDetails}</p>
//                       <p>{rideDetails.vehicleColor} • {rideDetails.vehiclePlate}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="ride-info">
//                   <div className="info-item">
//                     <span className="info-label">Pickup</span>
//                     <span className="info-value">{location}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Destination</span>
//                     <span className="info-value">{destination}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Pickup Time</span>
//                     <span className="info-value">{pickupTime}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Est. Arrival</span>
//                     <span className="info-value">{rideDetails.estimatedTimeMinutes} minutes</span>
//                   </div>
//                   {estimatedPrice && (
//                     <div className="info-item price">
//                       <span className="info-label">Est. Price</span>
//                       <span className="info-value">₦{estimatedPrice.toLocaleString()}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="trip-map">
//                   {isLoaded && (
//                     <GoogleMap
//                       mapContainerStyle={mapContainerStyle}
//                       center={center}
//                       zoom={12}
//                       onLoad={onMapLoad}
//                     >
//                       {selectedLocations.origin && (
//                         <Marker 
//                           position={selectedLocations.origin} 
//                           label="A"
//                         />
//                       )}
//                       {selectedLocations.destination && (
//                         <Marker 
//                           position={selectedLocations.destination} 
//                           label="B"
//                         />
//                       )}
//                       {directions && (
//                         <DirectionsRenderer
//                           directions={directions}
//                           options={{
//                             polylineOptions: {
//                               strokeColor: "#4285F4",
//                               strokeWeight: 5
//                             }
//                           }}
//                         />
//                       )}
//                     </GoogleMap>
//                   )}
//                 </div>
                
//                 <div className="action-buttons">
//                   <button className="contact-driver">
//                     <span className="icon">📞</span> Contact Driver
//                   </button>
//                   <button className="cancel-ride" onClick={resetBooking}>
//                     <span className="icon">✕</span> Cancel Ride
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="booking-form-container">
//                   <div className="form-header">
//                     <h2>Book Your Ride</h2>
//                     {userData && userData.role === "user" && (
//                       <p className="welcome-user">Welcome, {userData.name}</p>
//                     )}
//                     {estimatedPrice && (
//                       <div className="price-estimate">
//                         <p>Estimated price: <span className="price">₦{estimatedPrice.toLocaleString()}</span></p>
//                       </div>
//                     )}
//                   </div>
                  
//                   <form className="booking-form" onSubmit={handleBookRide}>
//                     <div className="form-group">
//                       <label htmlFor="location">Pickup Location</label>
//                       <input 
//                         id="location"
//                         type="text" 
//                         value={location} 
//                         onChange={(e) => setLocation(e.target.value)}
//                         placeholder="Enter pickup location" 
//                         required
//                       />
//                     </div>
                    
//                     <div className="form-group">
//                       <label htmlFor="destination">Destination</label>
//                       <input 
//                         id="destination"
//                         type="text" 
//                         value={destination} 
//                         onChange={(e) => setDestination(e.target.value)}
//                         placeholder="Enter destination" 
//                         required
//                       />
//                     </div>
                    
//                     <div className="form-group">
//                       <label htmlFor="pickupTime">Pickup Time</label>
//                       <input 
//                         id="pickupTime"
//                         type="datetime-local" 
//                         value={pickupTime} 
//                         onChange={(e) => setPickupTime(e.target.value)}
//                         required
//                       />
//                     </div>
                    
//                     <div className="form-help">
//                       <p>Click on the map to select pickup and destination points</p>
//                     </div>
                    
//                     <button type="submit" className="book-button" disabled={isLoading}>
//                       {isLoading ? 'Calculating route...' : 'Book Ride Now'}
//                     </button>
//                   </form>
//                 </div>
                
//                 <div className="map-container">
//                   {isLoaded && (
//                     <GoogleMap
//                       mapContainerStyle={mapContainerStyle}
//                       center={center}
//                       zoom={12}
//                       onLoad={onMapLoad}
//                       onClick={handleMapClick}
//                     >
//                       {selectedLocations.origin && (
//                         <Marker 
//                           position={selectedLocations.origin} 
//                           label="A"
//                         />
//                       )}
//                       {selectedLocations.destination && (
//                         <Marker 
//                           position={selectedLocations.destination} 
//                           label="B"
//                         />
//                       )}
//                       {directions && (
//                         <DirectionsRenderer
//                           directions={directions}
//                           options={{
//                             polylineOptions: {
//                               strokeColor: "#4285F4",
//                               strokeWeight: 5
//                             }
//                           }}
//                         />
//                       )}
//                     </GoogleMap>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <footer className="app-footer">
//         <p>© 2025 SafeRide. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default RideBooking;