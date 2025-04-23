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