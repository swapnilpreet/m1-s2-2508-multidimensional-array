import React, { useMemo } from "react";

function timeAgoText(ts) {
  const diff = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} mins ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hours ago`;
  const d = Math.floor(h / 24);
  return `${d} days ago`;
}

const MessageItem = React.memo(function MessageItem({ msg }) {
  const showTime = useMemo(() => timeAgoText(msg.time), [msg.time]);

  return (
    <div className={`msg-item ${msg.isMine ? "mine" : ""}`}>
      <div className="msg-top">
        <span className="msg-sender">{msg.senderName}</span>
        <span className="msg-time">{showTime}</span>
      </div>
      <div className="msg-text">{msg.text}</div>
    </div>
  );
});

export default MessageItem;
