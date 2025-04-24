// Main RideBooking.jsx (Refactored)
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import './RideBooking.css';

// Import components
import RideHeader from '../../components/RideBooking/RideHeader';
import RideFooter from '../../components/RideBooking/RideFooter';
import AuthMessage from '../../components/RideBooking/AuthMessage';
import BookingForm from '../../components/RideBooking/BookingForm';
import BookingConfirmation from '../../components/RideBooking/BookingConfirmation';
import RideMap from '../../components/RideBooking/RideMap';

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
  const [center, setCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos, Nigeria
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    origin: null,
    destination: null
  });
  const [routeWaypoints, setRouteWaypoints] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);

  // Price calculation
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  
  // Auth listener
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
        
  //       // Get additional user data from Firestore
  //       try {
  //         const userRef = doc(db, "users", currentUser.uid);
  //         const userSnap = await getDoc(userRef);
          
  //         if (userSnap.exists()) {
  //           setUserData(userSnap.data());
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     } else {
  //       setUser(null);
  //       setUserData(null);
  //     }
  //   });
    
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
  
        // Fetch user data from Firestore
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
  
    // Cleanup function to avoid duplicate listeners
    return () => unsubscribe();
  }, []);
  
  // Try to get user's current location
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const userLocation = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         };
  //         setCenter(userLocation);
  //         setCurrentUserLocation(userLocation); // Store the user's current location
          
  //         // If origin isn't set yet, automatically use current location
  //         if (!selectedLocations.origin) {
  //           reverseGeocode(userLocation.lat, userLocation.lng)
  //             .then(locationName => {
  //               setLocation(locationName);
  //               setSelectedLocations({
  //                 ...selectedLocations,
  //                 origin: userLocation
  //               });
  //               toast.info("Using your current location as pickup point. Select your destination on the map.");
  //             });
  //         }
  //       },
  //       (error) => {
  //         console.error("Error getting current location:", error);
  //         toast.error("Could not get your location. Please allow location access or select it manually on the map.");
  //       }
  //     );
  //   }
  // }, []);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          setCurrentUserLocation(userLocation);
  
          // Only toast if origin is not already set
          if (!selectedLocations.origin) {
            reverseGeocode(userLocation.lat, userLocation.lng).then((locationName) => {
              setLocation(locationName);
              setSelectedLocations({
                ...selectedLocations,
                origin: userLocation,
              });
              toast.info("Using your current location as pickup point. Select your destination on the map.");
            });
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          toast.error("Could not get your location. Please allow location access or select it manually on the map.");
        }
      );
    }
  }, [selectedLocations.origin]); // Add dependency to avoid multiple calls

  // Update route waypoints when origin or destination changes
  useEffect(() => {
    const waypoints = [];
    if (selectedLocations.origin) waypoints.push(selectedLocations.origin);
    if (selectedLocations.destination) waypoints.push(selectedLocations.destination);
    
    if (waypoints.length === 2) {
      setRouteWaypoints(waypoints);
    }
  }, [selectedLocations]);

  // Reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      return data.display_name || "Current Location";
    } catch (error) {
      console.error("Error with reverse geocoding:", error);
      return "Current Location";
    }
  };
  
  // Handle ride booking
  const handleBookRide = (e) => {
    e.preventDefault();
    
    if (!location || !destination || !pickupTime) {
      toast.error("Please fill in all fields");
      return;
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
  // const handleMapClick = (e) => {
  //   const clickedLat = e.latlng.lat;
  //   const clickedLng = e.latlng.lng;
    
  //   if (!selectedLocations.origin) {
  //     // Set origin location
  //     setIsLoading(true);
  //     reverseGeocode(clickedLat, clickedLng)
  //       .then(locationName => {
  //         setLocation(locationName);
  //         setSelectedLocations({
  //           ...selectedLocations,
  //           origin: { lat: clickedLat, lng: clickedLng }
  //         });
  //         setIsLoading(false);
  //         toast.info("Pickup location selected. Now select your destination.");
  //       });
  //   } else if (!selectedLocations.destination) {
  //     // Set destination location
  //     setIsLoading(true);
  //     reverseGeocode(clickedLat, clickedLng)
  //       .then(locationName => {
  //         setDestination(locationName);
  //         setSelectedLocations({
  //           ...selectedLocations,
  //           destination: { lat: clickedLat, lng: clickedLng }
  //         });
  //         setIsLoading(false);
  //         toast.success("Route calculated! You can now book your ride.");
  //       });
  //   } else {
  //     // If both locations are already set, allow changing the destination
  //     setIsLoading(true);
  //     reverseGeocode(clickedLat, clickedLng)
  //       .then(locationName => {
  //         setDestination(locationName);
  //         setSelectedLocations({
  //           ...selectedLocations,
  //           destination: { lat: clickedLat, lng: clickedLng }
  //         });
  //         setIsLoading(false);
  //         toast.info("Destination updated!");
  //       });
  //   }
  // };


  const handleMapClick = (e) => {
    const clickedLat = e.latlng.lat;
    const clickedLng = e.latlng.lng;
  
    if (!selectedLocations.origin) {
      setIsLoading(true);
      reverseGeocode(clickedLat, clickedLng).then((locationName) => {
        setLocation(locationName);
        setSelectedLocations({
          ...selectedLocations,
          origin: { lat: clickedLat, lng: clickedLng },
        });
        setIsLoading(false);
        toast.info("Pickup location selected. Now select your destination.");
      });
    } else if (!selectedLocations.destination) {
      setIsLoading(true);
      reverseGeocode(clickedLat, clickedLng).then((locationName) => {
        setDestination(locationName);
        setSelectedLocations({
          ...selectedLocations,
          destination: { lat: clickedLat, lng: clickedLng },
        });
        setIsLoading(false);
        toast.success("Route calculated! You can now book your ride.");
      });
    } else {
      setIsLoading(true);
      reverseGeocode(clickedLat, clickedLng).then((locationName) => {
        setDestination(locationName);
        setSelectedLocations({
          ...selectedLocations,
          destination: { lat: clickedLat, lng: clickedLng },
        });
        setIsLoading(false);
        toast.info("Destination updated!");
      });
    }
  };
  
  const resetBooking = () => {
    setLocation('');
    setDestination('');
    setPickupTime('');
    setSelectedLocations({ origin: null, destination: null });
    setRouteWaypoints([]);
    setBookingSubmitted(false);
    setRideDetails(null);
    setEstimatedPrice(null);
    toast.info("Ride cancelled");
    
    // Restore current location as origin if available
    if (currentUserLocation) {
      reverseGeocode(currentUserLocation.lat, currentUserLocation.lng)
        .then(locationName => {
          setLocation(locationName);
          setSelectedLocations({
            ...selectedLocations,
            origin: currentUserLocation
          });
        });
    }
  };

  // Function to use current location as pickup point
  const useCurrentLocationAsPickup = () => {
    if (currentUserLocation) {
      reverseGeocode(currentUserLocation.lat, currentUserLocation.lng)
        .then(locationName => {
          setLocation(locationName);
          setSelectedLocations({
            ...selectedLocations,
            origin: currentUserLocation
          });
          toast.info("Using your current location as pickup point.");
        });
    } else {
      toast.error("Could not detect your current location. Please enable location services.");
    }
  };

  return (
    <div className="ride-booking-container">
      <RideHeader user={user} userData={userData} />

      <div className="main-content">
        {!user ? (
          <AuthMessage />
        ) : (
          <div className="booking-map-container">
            {bookingSubmitted ? (
              <BookingConfirmation 
                rideDetails={rideDetails}
                location={location}
                destination={destination}
                pickupTime={pickupTime}
                estimatedPrice={estimatedPrice}
                center={center}
                currentUserLocation={currentUserLocation}
                selectedLocations={selectedLocations}
                routeWaypoints={routeWaypoints}
                setEstimatedPrice={setEstimatedPrice}
                resetBooking={resetBooking}
              />
            ) : (
              <>
                <BookingForm 
                  userData={userData}
                  estimatedPrice={estimatedPrice}
                  location={location}
                  setLocation={setLocation}
                  destination={destination}
                  setDestination={setDestination}
                  pickupTime={pickupTime}
                  setPickupTime={setPickupTime}
                  currentUserLocation={currentUserLocation}
                  useCurrentLocationAsPickup={useCurrentLocationAsPickup}
                  isLoading={isLoading}
                  selectedLocations={selectedLocations}
                  handleBookRide={handleBookRide}
                />
                
                <div className="map-container">
                  <RideMap 
                    center={center}
                    currentUserLocation={currentUserLocation}
                    selectedLocations={selectedLocations}
                    routeWaypoints={routeWaypoints}
                    setEstimatedPrice={setEstimatedPrice}
                    location={location}
                    destination={destination}
                    onMapClick={handleMapClick}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <RideFooter />
    </div>
  );
};

export default RideBooking;