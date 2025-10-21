import React, { useState, useEffect, useMemo, useCallback } from "react";

const ProfileList = React.memo(({ profiles }) => {
  console.log("Rendering ProfileList...");
  return (
    <ul>
      {profiles.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
});

const ProfileSearch = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleSearch = useCallback(() => {
    const result = profiles.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [profiles, search]);

  const optimizedProfiles = useMemo(() => {
    return filtered.length ? filtered : profiles;
  }, [filtered, profiles]);

  return (
    <div>
      <h2>Profile Search</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user..."
      />
      <button onClick={handleSearch}>Search</button>

      <ProfileList profiles={optimizedProfiles} />
    </div>
  );
};

export default ProfileSearch;
