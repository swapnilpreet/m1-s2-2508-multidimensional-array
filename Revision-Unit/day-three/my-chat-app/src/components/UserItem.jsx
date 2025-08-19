import React from "react";

const UserItem = React.memo(function UserItem({ user, onToggle }) {
  return (
    <div className="user-item">
      <div className="user-left">
        <div className={`user-dot ${user.isOnline ? "on" : "off"}`} />
        <div className="user-name">{user.username}</div>
      </div>
      <button className="user-btn" onClick={onToggle}>
        {user.isOnline ? "Go Offline" : "Go Online"}
      </button>
    </div>
  );
});

export default UserItem;
