import React, { useMemo, useRef, useCallback } from "react";
import MessageItem from "./MessageItem.jsx";

function findName(users, id) {
  const f = users.find((x) => x.id === id);
  return f ? f.username : "unknown";
}

const MessagesPanel = React.memo(function MessagesPanel({
  messages,
  users,
  onSend,
  myUserId,
}) {
  const inputRef = useRef(null);
  const messageWithNames = useMemo(()=>{
    return messages.map((m) => ({
      ...m,
      senderName: findName(users, m.fromId),
      isMine: m.fromId === myUserId,
    }));
  }, [messages, users, myUserId]);

  const handleSendClick = useCallback(() => {
    const val = inputRef.current?.value?.trim();
    if (!val) return;
    onSend(myUserId, val);
    inputRef.current.value = "";
  }, [onSend, myUserId]);

  const handleEnter = useCallback((e) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  }, [handleSendClick]);

  return (
    <section className="msg-panel">
      <div className="msg-list">
        {messageWithNames.map((m) => (
          <MessageItem key={m.id} msg={m} />
        ))}
      </div>

      <div className="msg-input-row">
        <input
          ref={inputRef}
          className="msg-input"
          placeholder="type message..."
          onKeyDown={handleEnter}
        />
        <button className="msg-send-btn" onClick={handleSendClick}>
          Send
        </button>
      </div>
    </section>
  );
});

export default MessagesPanel;
