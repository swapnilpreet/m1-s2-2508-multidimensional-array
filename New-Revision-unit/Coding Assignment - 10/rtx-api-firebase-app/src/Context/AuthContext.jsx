import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, {
  createContext,
  useState,
  useEffect,
} from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();
 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloggedin, setisloggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  const signupUser = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    setUser({ uid: cred.user.uid, email, displayName });
    setisloggedin(true);
  };

  const loginUser = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName,
    });
    setisloggedin(true);
  };

  const logoutUser = async () => {
    await signOut(auth);
    setUser(null);
    setisloggedin(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
        setisloggedin(true);
      } else {
        setUser(null);
        setisloggedin(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isloggedin, loginUser, signupUser, logoutUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
