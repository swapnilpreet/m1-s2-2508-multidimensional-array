import React, { useMemo, useState, useCallback } from "react";
import "./App.css";
import ChatHeader from "./components/ChatHeader";
import ThemeToggle from "./components/ThemeToggle";
import UsersSidebar from "./components/UsersSidebar";
import MessagesPanel from "./components/MessagesPanel";
import SettingsPanel from "./components/SettingsPanel";
import HomePage from "./pages/HomePage";
import NestedInputPage from "./pages/NestedInputPage";

const startUsers = [
  { id: 1, username: "Swapnil", isOnline: true },
  { id: 2, username: "hritik", isOnline: true },
  { id: 3, username: "ram", isOnline: false },
  { id: 4, username: "sham", isOnline: true },
];

const startChat = {
  id: "room-1",
  participantIds: [1, 2, 3],
};

const startMessages = [
  { id: 101, fromId: 1, text: "hey hello!", time: Date.now() - 1000 * 60 * 6 },
  { id: 102, fromId: 2, text: "hi! how are you?", time: Date.now() - 1000 * 60 * 5 },
  { id: 103, fromId: 1, text: "i am good. wbu?", time: Date.now() - 1000 * 60 * 4 },
  { id: 104, fromId: 3, text: "both of you free later?", time: Date.now() - 1000 * 60 * 3 },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [userList, setUserList] = useState(startUsers);
  const [activeChat, setActiveChat] = useState(startChat);
  const [msgList, setMsgList] = useState(startMessages);
  const [appTheme, setAppTheme] = useState("light");
  const sendMsg = useCallback((fromId, textValue) => {
    const newMsg = {
      id: Date.now(),
      fromId,
      text: textValue,
      time: Date.now(),
    };
    setMsgList((old) => [...old, newMsg]);
  }, []);
  const toggleUserOnline = useCallback((userId) => {
    setUserList((old) =>
      old.map((u) => (u.id === userId ? { ...u, isOnline: !u.isOnline } : u))
    );
  }, []);
  const chatPeople = useMemo(() => {
    const setIds = new Set(activeChat.participantIds);
    return userList.filter((u) => setIds.has(u.id));
  }, [userList, activeChat]);

  return (
    <div className={`app-wrap ${appTheme === "dark" ? "theme-dark" : ""}`}>
      <div className="app-topbar">
        <ChatHeader
          roomId={activeChat.id}
          people={chatPeople}
        />
        <div className="topbar-right">
          <ThemeToggle themeValue={appTheme} onChangeTheme={setAppTheme} />
          <SettingsPanel />
        </div>
      </div>

      <div className="app-body">
        <UsersSidebar
          users={userList}
          onToggleUserOnline={toggleUserOnline}
        />
        <MessagesPanel
          messages={msgList}
          users={userList}
          onSend={sendMsg}
          myUserId={1}
        />
      </div>

      <div>
      {page === "home" ? (
        <HomePage goNext={() => setPage("nested")} />
      ) : (
        <NestedInputPage goBack={() => setPage("home")} />
      )}
    </div>

    </div>
  );
}
