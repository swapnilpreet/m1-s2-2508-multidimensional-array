import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log("Error fetching users", err));
  }, []);

  const handleAddUser = () => {
    if (newUser.trim() === "") return;
    const updatedUsers = [...users, { id: Date.now(), name: newUser }];
    setUsers(updatedUsers);
    setNewUser("");
  };

  return (
    <div>
      <h2>User List</h2>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Add new user"
      />
      <button onClick={handleAddUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
