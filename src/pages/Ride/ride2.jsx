// Header.jsx
import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Header = ({ user, userData }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <header className="app-header">
      <div className="logo">
        <h1>SafeRide</h1>
      </div>
      {user && (
        <div className="user-menu">
          <span>Hi, {userData?.name || user.email}</span>
          <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </header>
  );
};

export default Header;

// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© 2025 SafeRide. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

// AuthMessage.jsx
import React from 'react';

const AuthMessage = () => {
  return (
    <div className="auth-message">
      <h2>Please Sign In</h2>
      <p>You need to sign in to book a ride with SafeRide.</p>
    </div>
  );
};

export default AuthMessage;

// MapComponents.jsx
import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { toast } from "react-toastify";

// Create custom icon for markers
export const createCustomIcon = (color, label) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; justify-content: center; align-items: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">${label}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

// Component to handle map click events and update
export const MapEvents = ({ onMapClick, selectedLocations }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    map.on('click', onMapClick);
    
    // Center and zoom the map to fit both markers if they exist
    if (selectedLocations.origin && selectedLocations.destination) {
      const bounds = L.latLngBounds(
        [selectedLocations.origin.lat, selectedLocations.origin.lng],
        [selectedLocations.destination.lat, selectedLocations.destination.lng]
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (selectedLocations.origin) {
      map.setView([selectedLocations.origin.lat, selectedLocations.origin.lng], 14);
    }
    
    return () => {
      map.off('click', onMapClick);
    };
  }, [map, onMapClick, selectedLocations]);
  
  return null;
};

// Component to handle routing
export const RoutingControl = ({ waypoints, setEstimatedPrice }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  
  useEffect(() => {
    if (!map || !waypoints.length || waypoints.length < 2) return;
    
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
    
    const routingControl = L.Routing.control({
      waypoints: waypoints.map(point => L.latLng(point.lat, point.lng)),
      routeWhileDragging: false,
      showAlternatives: true,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#4285F4', weight: 6, opacity: 0.7 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      createMarker: () => null, // Don't create default markers
      fitSelectedRoutes: true
    }).addTo(map);
    
    routingControl.on('routesfound', (e) => {
      const routes = e.routes;
      const distanceInKm = routes[0].summary.totalDistance / 1000;
      const timeInMinutes = Math.round(routes[0].summary.totalTime / 60);
      
      // Calculate estimated price based on distance
      const basePrice = 500; // Base price in local currency
      const pricePerKm = 150; // Price per km
      let calculatedPrice = basePrice + (distanceInKm * pricePerKm);
      
      // Add surge pricing during peak hours (if applicable)
      const currentHour = new Date().getHours();
      if (currentHour >= 7 && currentHour <= 9 || currentHour >= 16 && currentHour <= 19) {
        calculatedPrice *= 1.2; // 20% surge during peak hours
      }
      
      setEstimatedPrice(Math.round(calculatedPrice));
      
      // Center the map to show the entire route
      const bounds = L.latLngBounds(waypoints.map(point => [point.lat, point.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
      
      toast.info(`Estimated journey: ${Math.round(distanceInKm * 10) / 10} km, approximately ${timeInMinutes} minutes`);
    });
    
    routingControlRef.current = routingControl;
    
    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, waypoints, setEstimatedPrice]);
  
  return null;
};

// RideMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapEvents, RoutingControl, createCustomIcon } from './MapComponents';

const RideMap = ({ 
  center, 
  currentUserLocation, 
  selectedLocations, 
  routeWaypoints, 
  setEstimatedPrice, 
  location, 
  destination, 
  onMapClick = () => {},
  zoom = 13
}) => {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className="leaflet-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {currentUserLocation && (
        <Marker 
          position={[currentUserLocation.lat, currentUserLocation.lng]} 
          icon={createCustomIcon('#FF5722', 'You')}
          className="current-location"
        >
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
      
      {selectedLocations.origin && (
        <Marker 
          position={[selectedLocations.origin.lat, selectedLocations.origin.lng]} 
          icon={createCustomIcon('#00B074', 'A')}
        >
          <Popup>Pickup Location: {location}</Popup>
        </Marker>
      )}
      
      {selectedLocations.destination && (
        <Marker 
          position={[selectedLocations.destination.lat, selectedLocations.destination.lng]} 
          icon={createCustomIcon('#4285F4', 'B')}
        >
          <Popup>Destination: {destination}</Popup>
        </Marker>
      )}
      
      {routeWaypoints.length === 2 && (
        <RoutingControl 
          waypoints={routeWaypoints} 
          setEstimatedPrice={setEstimatedPrice}
        />
      )}
      
      <MapEvents onMapClick={onMapClick} selectedLocations={selectedLocations} />
    </MapContainer>
  );
};

export default RideMap;

// BookingForm.jsx
import React from 'react';
import { toast } from "react-toastify";

const BookingForm = ({ 
  userData, 
  estimatedPrice, 
  location, 
  setLocation, 
  destination, 
  setDestination, 
  pickupTime, 
  setPickupTime, 
  currentUserLocation, 
  useCurrentLocationAsPickup, 
  isLoading, 
  selectedLocations, 
  handleBookRide 
}) => {
  return (
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
          <div className="location-input-group">
            <input 
              id="location"
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter pickup location" 
              required
            />
            {currentUserLocation && (
              <button 
                type="button" 
                className="use-current-location" 
                onClick={useCurrentLocationAsPickup}
              >
                Use current location
              </button>
            )}
          </div>
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
        
        <button 
          type="submit" 
          className="book-button" 
          disabled={isLoading || !selectedLocations.origin || !selectedLocations.destination || !pickupTime}
        >
          {isLoading ? 'Calculating route...' : 'Book Ride Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

// BookingConfirmation.jsx
import React from 'react';
import RideMap from './RideMap';

const BookingConfirmation = ({ 
  rideDetails, 
  location, 
  destination, 
  pickupTime, 
  estimatedPrice, 
  center, 
  currentUserLocation, 
  selectedLocations, 
  routeWaypoints, 
  setEstimatedPrice, 
  resetBooking 
}) => {
  return (
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
        <RideMap 
          center={center}
          zoom={12}
          currentUserLocation={currentUserLocation}
          selectedLocations={selectedLocations}
          routeWaypoints={routeWaypoints}
          setEstimatedPrice={setEstimatedPrice}
          location={location}
          destination={destination}
        />
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
  );
};

export default BookingConfirmation;

// Main RideBooking.jsx (Refactored)
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import './RideBooking.css';

// Import components
import Header from './Header';
import Footer from './Footer';
import AuthMessage from './AuthMessage';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';
import RideMap from './RideMap';

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
  
  // Try to get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCenter(userLocation);
          setCurrentUserLocation(userLocation); // Store the user's current location
          
          // If origin isn't set yet, automatically use current location
          if (!selectedLocations.origin) {
            reverseGeocode(userLocation.lat, userLocation.lng)
              .then(locationName => {
                setLocation(locationName);
                setSelectedLocations({
                  ...selectedLocations,
                  origin: userLocation
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
  }, []);

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
  const handleMapClick = (e) => {
    const clickedLat = e.latlng.lat;
    const clickedLng = e.latlng.lng;
    
    if (!selectedLocations.origin) {
      // Set origin location
      setIsLoading(true);
      reverseGeocode(clickedLat, clickedLng)
        .then(locationName => {
          setLocation(locationName);
          setSelectedLocations({
            ...selectedLocations,
            origin: { lat: clickedLat, lng: clickedLng }
          });
          setIsLoading(false);
          toast.info("Pickup location selected. Now select your destination.");
        });
    } else if (!selectedLocations.destination) {
      // Set destination location
      setIsLoading(true);
      reverseGeocode(clickedLat, clickedLng)
        .then(locationName => {
          setDestination(locationName);
          setSelectedLocations({
            ...selectedLocations,
            destination: { lat: clickedLat, lng: clickedLng }
          });
          setIsLoading(false);
          toast.success("Route calculated! You can now book your ride.");
        });
    } else {
      // If both locations are already set, allow changing the destination
      setIsLoading(true);
      reverseGeocode(clickedLat, clickedLng)
        .then(locationName => {
          setDestination(locationName);
          setSelectedLocations({
            ...selectedLocations,
            destination: { lat: clickedLat, lng: clickedLng }
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
      <Header user={user} userData={userData} />

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

      <Footer />
    </div>
  );
};

export default RideBooking;