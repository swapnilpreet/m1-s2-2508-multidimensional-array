import React, { useState } from "react";
import { collegeinitialState, collegeReducer } from "../context/collegeReducer";

const Collegeform = () => {
  const [state, dispatch] = useState(collegeReducer, collegeinitialState);
  const [isSubmited, setisSubmited] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisSubmited(true);
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setisSubmited(false);
  };

  return (
    <div>
      <h1>Add College</h1>
    <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="College Name"
    value={state.name}
    onChange={(e) => dispatch({ type: 'UPDATE_NAME', payload: e.target.value })}
  />

  <input
    type="number"
    placeholder="Establishment Year"
    value={state.establishment_year}
    onChange={(e) => dispatch({ type: 'UPDATE_ESTABLISHMENT_YEAR', payload: e.target.value })}
  />

  <input
    type="text"
    placeholder="Building"
    value={state.address.building}
    onChange={(e) => dispatch({ type: 'UPDATE_BUILDING', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="Street"
    value={state.address.street}
    onChange={(e) => dispatch({ type: 'UPDATE_STREET', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="City"
    value={state.address.city.name}
    onChange={(e) => dispatch({ type: 'UPDATE_CITY_NAME', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="Pincode"
    value={state.address.city.locality.pinCode}
    onChange={(e) => dispatch({ type: 'UPDATE_PINCODE', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="Landmark"
    value={state.address.city.locality.landmark}
    onChange={(e) => dispatch({ type: 'UPDATE_LANDMARK', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="State"
    value={state.address.state}
    onChange={(e) => dispatch({ type: 'UPDATE_ADDRESS_STATE', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="Latitude"
    value={state.address.coordinates.latitude}
    onChange={(e) => dispatch({ type: 'UPDATE_LATITUDE', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="Longitude"
    value={state.address.coordinates.longitude}
    onChange={(e) => dispatch({ type: 'UPDATE_LONGITUDE', payload: e.target.value })}
  /><br />

  <input
    type="text"
    placeholder="Courses Offered (comma separated)"
    value={state.courses_offered.join(', ')}
    onChange={(e) =>
      dispatch({
        type: 'UPDATE_COURSES_OFFERED',
        payload: e.target.value,
      })
    }
  /><br />

  <button type="submit">Submit</button>
  <button type="button" onClick={handleReset} style={{ marginLeft: '10px' }}>
    Reset
  </button>
</form>


       {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}

      {isSubmited && !state.error && (
        <div style={{ marginTop: '20px' }}>
          <h3>College Details</h3>
          <div><strong>Name:</strong> {state.name}</div>
          <div><strong>Established:</strong> {state.establishment_year}</div>
          <div><strong>Address:</strong>
            <p>{state.address.building}, {state.address.street}, {state.address.city.name}, {state.address.state}</p>
            <p>Pincode: {state.address.city.locality.pinCode}</p>
            <p>Landmark: {state.address.city.locality.landmark}</p>
            <p>Coordinates: ({state.address.coordinates.latitude}, {state.address.coordinates.longitude})</p>
          </div>
          <div><strong>Courses Offered:</strong> {state.courses_offered.join(', ')}</div>
        </div>
      )}
    </div>
  );
};

export default Collegeform;
