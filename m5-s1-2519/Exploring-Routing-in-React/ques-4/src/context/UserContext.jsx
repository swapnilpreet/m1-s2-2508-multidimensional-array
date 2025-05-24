import { createContext, useState } from 'react';
export const UserContext = createContext();
const mockUser = {
  name: 'Swapnil pree',
  email: 'swapnil@gmail.com',
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  const updateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
