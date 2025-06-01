export const collegeinitialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  courses_offered: [],
};

export function collegeReducer(state, action) {
  switch (action?.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };

    case "UPDATE_ESTABLISHMENT_YEAR":
      return { ...state, establishment_year: action.payload };

    case "UPDATE_BUILDING":
      return {
        ...state,
        address: { ...state.address, building: action.payload },
      };

    case "UPDATE_STREET":
      return {
        ...state,
        address: { ...state.address, street: action.payload },
      };

    case "UPDATE_ADDRESS_STATE":
      return {
        ...state,
        address: { ...state.address, state: action.payload },
      };
    case "UPDATE_CITY_NAME":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            name: action.payload,
          },
        },
      };
    case "UPDATE_PINCODE":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              pinCode: action.payload,
            },
          },
        },
      };

    case "UPDATE_LANDMARK":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              landmark: action.payload,
            },
          },
        },
      };

    case "UPDATE_LATITUDE":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            latitude: action.payload,
          },
        },
      };

    case "UPDATE_LONGITUDE":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            longitude: action.payload,
          },
        },
      };

    case "UPDATE_COURSES_OFFERED":
      return { ...state, courses_offered: action.payload };

    case "RESET":
      return collegeinitialState;

    default:
      return collegeinitialState;
  }
}
