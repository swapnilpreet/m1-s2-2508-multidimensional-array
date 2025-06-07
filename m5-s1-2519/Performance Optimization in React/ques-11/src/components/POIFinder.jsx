import React, { useEffect } from 'react';
import axios from 'axios';

const POIFinder = React.memo(({ location, setPOIs }) => {
  useEffect(() => {
    if (!location) return;

    const fetchPOIs = async () => {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=restaurant near ${location.lat},${location.lng}`);
      const pois = res.data.map((p) => ({
        name: p.display_name,
        position: { lat: parseFloat(p.lat), lng: parseFloat(p.lon) }
      }));
      setPOIs(pois);
    };

    fetchPOIs();
  }, [location, setPOIs]);

  return null;
});

export default POIFinder;