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