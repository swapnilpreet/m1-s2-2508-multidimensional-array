import { useUser } from "../context/User/useUser";

const DisplayUser = () => {
  const  user,loading,error  = useUser();
  console.log("user:", user);
  return (
    <>
      <h1>User Display</h1>
      {user?.map((u) => {
        return (
          <div key={u.id}>
            <h3>{u.name}</h3>
            <p>{u.email}</p>
            <p>{u.phone}</p>
            <p>{u.website}</p>
          </div>
        );
      })}
    </>
  );
};

export default DisplayUser;
