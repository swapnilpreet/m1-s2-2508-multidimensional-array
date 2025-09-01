import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Redux/userAction";

const Users = () => {
  const { loading, users, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>User List (API with Thunk)</h2>
      <button onClick={() => dispatch(fetchUsers())}>
        {loading ? "Loading..." : "fetchUser"}{" "}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Users;
