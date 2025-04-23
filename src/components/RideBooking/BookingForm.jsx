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