import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const LocationMarkers = ({ selectedLocations, setSelectedLocations }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (!selectedLocations.origin) {
        setSelectedLocations((prev) => ({ ...prev, origin: { lat, lng } }));
      } else if (!selectedLocations.destination) {
        setSelectedLocations((prev) => ({
          ...prev,
          destination: { lat, lng }
        }));
      }
    }
  });

  return (
    <>
      {selectedLocations.origin && (
        <Marker position={selectedLocations.origin}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}
      {selectedLocations.destination && (
        <Marker position={selectedLocations.destination}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </>
  );
};

const RideBookingMap = ({ selectedLocations, setSelectedLocations }) => {
  const center = selectedLocations.origin || { lat: 6.5244, lng: 3.3792 };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarkers
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />
    </MapContainer>
  );
};

export default RideBookingMap;
