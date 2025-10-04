require("dotenv").config();
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const boardRoutes = require("./routes/board.route");
const taskRoutes = require("./routes/tasks.route");
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL (Vite default port)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.send("Collabs tasks baord API"));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
  });

  socket.on("leaveBoard", (boardId) => {
    socket.leave(boardId);
  });
  socket.on("boardAction", (payload) => {
    if (payload && payload.boardId) {
      io.to(payload.boardId).emit("boardUpdate", payload);
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
