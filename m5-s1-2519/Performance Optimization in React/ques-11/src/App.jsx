import React, { useState, useCallback, useMemo } from 'react';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import RoutePlanner from './components/RoutePlanner';
import POIFinder from './components/POIFinder';

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pois, setPOIs] = useState([]);

  const handleLocationChange = useCallback((location) => {
    setCurrentLocation(location);
  }, []);

  const handleDestinationChange = useCallback((location) => {
    setDestination(location);
  }, []);

  const mapOptions = useMemo(() => ({ center: currentLocation, zoom: 13 }), [currentLocation]);

  return (
    <div className="app">
      <SearchBar onLocationSelect={handleLocationChange} />
      <SearchBar placeholder="Enter destination" onLocationSelect={handleDestinationChange} />
      <RoutePlanner origin={currentLocation} destination={destination} />
      <POIFinder location={currentLocation} setPOIs={setPOIs} />
      <MapView currentLocation={currentLocation} destination={destination} pois={pois} options={mapOptions} />
    </div>
  );
};

export default App;