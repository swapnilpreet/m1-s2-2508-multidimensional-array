const socket = io();

const loginBox = document.getElementById("login");
const nameInput = document.getElementById("name");
const adminTokenInput = document.getElementById("adminToken");
const joinBtn = document.getElementById("joinBtn");

const onlinePanel = document.getElementById("onlinePanel");
const onlineUsersEl = document.getElementById("onlineUsers");
const onlineCountEl = document.getElementById("onlineCount");
const disconnectBtn = document.getElementById("disconnectBtn");

const adminPanel = document.getElementById("adminPanel");
const adminText = document.getElementById("adminText");
const announceBtn = document.getElementById("announceBtn");

const messagesEl = document.getElementById("messages");
const composer = document.getElementById("composer");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let isAdmin = false;

function appendMsg({ user, text, timestamp, isAdmin: adminFlag }) {
  const wrap = document.createElement("div");
  const time = timestamp ? new Date(timestamp) : new Date();
  const isSystem = user === "System";
  wrap.className = "msg" + (isSystem ? " system" : adminFlag ? " admin" : "");
  wrap.innerHTML = `
          <div class="meta">${user} • ${time.toLocaleTimeString()}</div>
          <div class="text"></div>
        `;
  wrap.querySelector(".text").textContent = text;
  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function updateOnline(users) {
  onlineUsersEl.innerHTML = "";
  (users || []).forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.name + (u.isAdmin ? " (admin)" : "");
    onlineUsersEl.appendChild(li);
  });
  onlineCountEl.textContent = (users || []).length;
}

function join() {
  const name = nameInput.value.trim();
  const adminToken = adminTokenInput.value.trim();
  if (!name) {
    alert("Enter a name");
    return;
  }

  socket.emit("user:register", { name, adminToken }, (res) => {
    if (!res || !res.ok) {
      alert(res?.error || "Failed to register");
      return;
    }
    isAdmin = !!res.isAdmin;
    loginBox.classList.add("hidden");
    onlinePanel.classList.remove("hidden");
    composer.classList.remove("hidden");
    if (isAdmin) adminPanel.classList.remove("hidden");
  });
}

joinBtn.addEventListener("click", join);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") join();
});

function sendCurrent() {
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit("chat:message", { text }, (res) => {
    if (!res?.ok) alert(res?.error || "Send failed");
    else messageInput.value = "";
  });
}
sendBtn.addEventListener("click", sendCurrent);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendCurrent();
  }
});

announceBtn.addEventListener("click", () => {
  const text = adminText.value.trim();
  if (!text) return;
  socket.emit("admin:announce", { text }, (res) => {
    if (!res?.ok) alert(res?.error || "Announce failed");
    else adminText.value = "";
  });
});

disconnectBtn.addEventListener("click", () => {
  socket.disconnect();
  location.reload();
});

socket.on("chat:history", (history) => {
  (history || []).forEach(appendMsg);
});
socket.on("chat:message", (msg) => {
  appendMsg(msg);
});
socket.on("user:list", (users) => {
  updateOnline(users);
});
