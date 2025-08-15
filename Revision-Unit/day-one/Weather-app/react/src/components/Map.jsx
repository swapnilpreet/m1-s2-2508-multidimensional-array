import React, { useEffect, useRef } from 'react'

const Map = ({ lat, lon }) => {
    const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng: lon },
      zoom: 8,
    });

    new window.google.maps.Marker({
      position: { lat, lng: lon },
      map,
    });
  }, [lat, lon]);

  return <div ref={mapRef} style={{ height: "300px", marginTop: "1rem" }} />;
}

export default Map