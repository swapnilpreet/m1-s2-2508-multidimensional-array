import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({Children} ) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchUsers=async () => {
      try{
        const User=await fetch("https://jsonplaceholder.typicode.com/users");
        const data=await User.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Something went wrong");
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  console.log("data:", user);

  return (
    <UserContext.Provider value={{user,loading,error}}>
      {Children}
    </UserContext.Provider>
  )
};

export default UserProvider;
