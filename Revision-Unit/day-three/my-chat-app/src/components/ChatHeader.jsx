import React from "react";

const ChatHeader = React.memo(function ChatHeader({ roomId, people }) {
  return (
    <div className="chat-header">
      <div className="chat-title">Room: {roomId}</div>
      <div className="chat-sub">
        Participants: {people.length} •{" "}
        {people.map((p) => p.username).join(", ")}
      </div>
    </div>
  );
});

export default ChatHeader;
