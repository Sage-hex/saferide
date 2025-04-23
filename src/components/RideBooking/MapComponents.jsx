// MapComponents.jsx
import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
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