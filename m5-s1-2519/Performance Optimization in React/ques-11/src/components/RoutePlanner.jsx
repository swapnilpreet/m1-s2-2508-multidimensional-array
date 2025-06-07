import React from 'react';

const RoutePlanner = React.memo(({ origin, destination }) => {
  return origin && destination ? <p>Route from ({origin.lat}, {origin.lng}) to ({destination.lat}, {destination.lng})</p> : null;
});

export default RoutePlanner;