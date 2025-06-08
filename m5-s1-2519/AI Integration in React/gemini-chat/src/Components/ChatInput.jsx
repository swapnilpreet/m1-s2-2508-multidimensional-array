import { useState } from "react";
import { useChat } from "../context/ChatContext";

const ChatInput = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addMessage } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: "Hello Gemini!" }] }],
          }),
        }
      );

      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Error: No response";
      addMessage({
        role: "assistant",
        text: aiText,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
      addMessage({
        role: "assistant",
        text: "⚠️ Gemini API error",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
        placeholder="Ask something..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
