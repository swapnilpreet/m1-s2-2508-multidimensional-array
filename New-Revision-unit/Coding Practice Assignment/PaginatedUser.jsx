import React, { useState, useEffect,useRef } from "react";
import axios from "axios";

const PaginatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const throttleRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const allUsers = res.data;

      // 1
      // Complete pagination logic here
      const lastuserindex=currentPage*usersPerPage;
      const indexOfFirstUser=lastuserindex-usersPerPage;
      const currentUsers=allUsers.slice(indexOfFirstUser,lastuserindex);
      setUsers(currentUsers);
      setTotalPages(Math.ceil(allUsers.length/usersPerPage));
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // 2
  // Implement throttling logic here
  const throttledSetPage = (page) => {
    if (throttleRef.current) return;
    throttleRef.current = setTimeout(() => {
      setCurrentPage(page);
      throttleRef.current = null;
    }, 500);
  };

  let buttons=Array.from({length:totalPages});

  return (
    <div>
      <h2>Paginated Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <div>
        {/* 3 */}
        {/* Render page numbers here */}
        {buttons.map((ele, index) => (
          <button key={index+1} onClick={() => throttledSetPage(index + 1)}>
            {index+1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedUsers;
