import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Recenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center);
  }, [center]);
  return null;
};

const MapView = React.memo(({ currentLocation, destination, pois, options }) => {
  return (
    <MapContainer center={options.center || [20, 77]} zoom={options.zoom} style={{ height: '500px', width: '100%' }}>
      <Recenter center={options.center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {currentLocation && (
        <Marker position={currentLocation} icon={L.icon({ iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={destination} icon={L.icon({ iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/green.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {pois.map((poi, idx) => (
        <Marker key={idx} position={poi.position}>
          <Popup>{poi.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default MapView;
