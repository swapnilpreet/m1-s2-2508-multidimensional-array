import React from "react";
import UserItem from "./UserItem.jsx";

const UsersSidebar = React.memo(function UsersSidebar({ users, onToggleUserOnline }) {
  return (
    <aside className="users-side">
      <div className="users-head">Active Users</div>
      <div className="users-list">
        {users.map((u) => (
          <UserItem
            key={u.id}
            user={u}
            onToggle={() => onToggleUserOnline(u.id)}
          />
        ))}
      </div>
    </aside>
  );
});

export default UsersSidebar;
