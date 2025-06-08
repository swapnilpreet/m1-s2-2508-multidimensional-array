import './App.css';
import { ChatProvider } from './context/ChatContext';
import ChatWindow from './Components/ChatWindow';
import ChatInput from './Components/ChatInput';

function App() {
  return (
    <ChatProvider>
      <div className="app">
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export default App;