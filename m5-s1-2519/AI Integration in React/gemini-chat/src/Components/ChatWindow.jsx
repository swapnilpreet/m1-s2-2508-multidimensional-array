import { useChat } from '../context/ChatContext';
import MessageBubble from './MessageBubble';

const ChatWindow = () => {
  const { messages } = useChat();

  return (
    <div>
      {messages.map((msg, i) => (
        <MessageBubble key={i} {...msg} />
      ))}
    </div>
  );
};

export default ChatWindow;
