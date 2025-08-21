require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const redis = require("redis");
const mongoose = require("mongoose");
const cron = require("node-cron");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redisClient = redis.createClient();
redisClient.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
})();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

const messageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

let onlineUsers = new Map();
 
app.use(express.static(path.join(__dirname, "public")));
 
io.on("connection", async (socket) => {
  console.log("New connection",socket.id);
  socket.on("join", async (username) => {
    if (!username) return;

    onlineUsers.set(socket.id, username);
    console.log(`👤 ${username} joined`);
    io.emit("userList", Array.from(onlineUsers.values()));
 
    let history = await redisClient.lRange("chat:messages", -20, -1);
    history = history.map((msg) => JSON.parse(msg));
    socket.emit("chatHistory", history);
  });

  socket.on("chatMessage", async (data) => {
    const user = onlineUsers.get(socket.id);
    if (!user) return;

    const msgData = {
      sender: user,
      message: data,
      timestamp: new Date(),
    };
    await redisClient.rPush("chat:messages", JSON.stringify(msgData));
    io.emit("chatMessage", msgData);
  });

  socket.on("adminMessage", async (data) => {
    const user = onlineUsers.get(socket.id);
    if (!user) return;
    if (
      process.env.ADMIN_SECRET &&
      data.secret !== process.env.ADMIN_SECRET
    ) {
      socket.emit("errorMessage", " Unauthorized: Not an admin");
      return;
    }

    const msgData = {
      sender: "Admin",
      message: data.message,
      timestamp: new Date(),
    };
    await redisClient.rPush("chat:messages", JSON.stringify(msgData));
    io.emit("chatMessage", msgData);
  });

  socket.on("disconnect", () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      console.log(`${user} disconnected`);
      onlineUsers.delete(socket.id);
      io.emit("userList", Array.from(onlineUsers.values()));
    }
  });
});

cron.schedule("*/1 * * * *", async () => {
  try {
    console.log("Running backup job...");
    const allMessages = await redisClient.lRange("chat:messages", 0, -1);

    if (allMessages.length > 0) {
      const docs = allMessages.map((m) => JSON.parse(m));
      await Message.insertMany(docs);
      console.log(`Backed up ${docs.length} messages to MongoDB`);
      await redisClient.del("chat:messages");
    }
  } catch (err) {
    console.error("Backup job failed:", err);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
