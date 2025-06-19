// src/components/Post.jsx
import React from "react";
import "../styles/Post.css";
import { FaEllipsisH } from "react-icons/fa";

const Post = ({ user, time, title, image, likes, comments }) => {
  return (
    <div className="post">
      <div className="post-top">
        {/* Left: Avatar + user info */}
        <div className="post-user-info">
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user}`}
            alt="avatar"
            className="post-avatar"
          />
          <div className="post-meta">
            <span className="post-username">{user}</span>
            <span className="post-time">• {time}</span>
          </div>
        </div>

        {/* Right: Join + menu */}
        <div className="post-actions">
          <button className="join-btn">Join</button>
          <FaEllipsisH className="menu-icon" />
        </div>
      </div>

      {/* Title */}
      <div className="post-title">{title}</div>

      {/* Image (optional) */}
      {image && <img src={image} alt="Post" className="post-image" />}

      {/* Footer */}
      <div className="post-footer">
        <span>👍 {likes}</span>
        <span>💬 {comments} Comments</span>
        <span>🔗 Share</span>
      </div>
    </div>
  );
};

export default Post;
