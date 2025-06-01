import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: null };

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT': return initialState;
    default: throw new Error('Unknown action');
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

