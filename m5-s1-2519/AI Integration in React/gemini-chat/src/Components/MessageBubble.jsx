
const MessageBubble = ({ role, text, timestamp }) => {
  return (
    <div className={`message-bubble ${role}`}>
      <p>{text}</p>
      <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
    </div>
  );
};

export default MessageBubble;
