const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { createClient } = require('redis');
const mongoose = require('mongoose');
const cron = require('node-cron');
const Message = require('./models/Message');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let onlineUsers = {};

const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', err => console.error('Redis Client Error:', err));

redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Failed to connect to Redis:', err));
 
const GLOBAL_CHAT_HISTORY_KEY = 'groupChatHistory';
const REDIS_HISTORY_LIMIT = 100;

/**
 * Adds a message object to the Redis list for chat history.
 * It also trims the list to keep only the most recent messages.
 * @param {Object} messageData - The message object to store.
 */
async function addMessageToRedis(messageData) {
    try {
        // RPUSH adds elements to the tail of the list
        await redisClient.RPUSH(GLOBAL_CHAT_HISTORY_KEY, JSON.stringify(messageData));
        // LTRIM keeps only the last REDIS_HISTORY_LIMIT elements
        await redisClient.LTRIM(GLOBAL_CHAT_HISTORY_KEY, -REDIS_HISTORY_LIMIT, -1);
    } catch (error) {
        console.error('Error adding message to Redis:', error);
    }
}

/**
 * Retrieves the entire chat history from Redis.
 * @returns {Array<Object>} An array of parsed message objects.
 */
async function getChatHistoryFromRedis() {
    try {
        const history = await redisClient.LRANGE(GLOBAL_CHAT_HISTORY_KEY, 0, -1);
        return history.map(msg => JSON.parse(msg));
    } catch (error) {
        console.error('Error fetching chat history from Redis:', error);
        return [];
    }
}

mongoose.connect('mongodb://localhost:27017/groupchat')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

cron.schedule('*/5 * * * *', async () => {
    console.log('Running cron job: Backing up chat history from Redis to MongoDB...');
    try {
        const history = await getChatHistoryFromRedis();
        if (history.length > 0) {
            const latestMongoMessage = await Message.findOne().sort({ createdAt: -1 });
            let messagesToSave = history;

            if (latestMongoMessage) {
                const latestMongoTimestamp = new Date(latestMongoMessage.timestamp).getTime();
                messagesToSave = history.filter(msg => new Date(msg.timestamp).getTime() > latestMongoTimestamp);
                console.log(`Found ${messagesToSave.length} new messages to backup.`);
            }

            if (messagesToSave.length > 0) {
                await Message.insertMany(messagesToSave, { ordered: false });
                console.log(`Backed up ${messagesToSave.length} messages to MongoDB.`);
            } else {
                console.log('No new messages to backup to MongoDB.');
            }
        } else {
            console.log('No chat history in Redis to backup.');
        }
    } catch (error) {
        console.error('Error during MongoDB backup cron job:', error);
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('register user', async (userName) => {
        if (!userName || userName.trim() === '') {
            socket.emit('registration error', 'Username cannot be empty.');
            return;
        }

        const trimmedUserName = userName.trim();
        const userExists = Object.values(onlineUsers).some(user => user.name === trimmedUserName);
        if (userExists) {
            socket.emit('registration error', 'Username already taken. Please choose another.');
            return;
        }
        onlineUsers[socket.id] = {
            name: trimmedUserName,
            isAdmin: (trimmedUserName.toLowerCase() === 'adminuser'),
            currentRoom: 'general'
        };
        socket.userName = trimmedUserName;
        socket.join('general');
        socket.emit('registration successful', trimmedUserName);
        io.emit('update online users', Object.values(onlineUsers).map(user => user.name));
        const history = await getChatHistoryFromRedis();
        socket.emit('chat history', history);
        const joinMessage = {
            user: 'System',
            message: `${trimmedUserName} has joined the chat.`,
            timestamp: new Date().toLocaleString(),
            room: 'general'
        };
        await addMessageToRedis(joinMessage);
        io.to('general').emit('chat message', joinMessage);
        console.log(`${trimmedUserName} registered and joined 'general' room.`);
    });

    socket.on('join room', async (roomName) => {
        const user = onlineUsers[socket.id];
        if (!user) {
            socket.emit('room error', 'You must be registered to join a room.');
            return;
        }

        const trimmedRoomName = roomName.trim();
        if (!trimmedRoomName) {
            socket.emit('room error', 'Room name cannot be empty.');
            return;
        }
        Object.keys(socket.rooms).forEach(room => {
            if (room !== socket.id && room !== user.currentRoom) {
                socket.leave(room);
                console.log(`${user.name} left room: ${room}`);
                io.to(room).emit('chat message', {
                    user: 'System',
                    message: `${user.name} has left this room.`,
                    timestamp: new Date().toLocaleString(),
                    room: room
                });
            }
        });

        socket.join(trimmedRoomName);
        user.currentRoom = trimmedRoomName;
        onlineUsers[socket.id] = user;
        io.to(trimmedRoomName).emit('chat message', {
            user: 'System',
            message: `${user.name} has joined ${trimmedRoomName}.`,
            timestamp: new Date().toLocaleString(),
            room: trimmedRoomName
        });
        socket.emit('room joined', trimmedRoomName);
        const history = await getChatHistoryFromRedis();
        const roomSpecificHistory = history.filter(msg => msg.room === trimmedRoomName || msg.room === undefined);
        socket.emit('chat history', roomSpecificHistory);
        console.log(`${user.name} joined room: ${trimmedRoomName}`);
    });
    socket.on('chat message', async (msg) => {
        const user = onlineUsers[socket.id];
        if (!user) {
            socket.emit('chat message', {
                user: 'System',
                message: 'You need to register to send messages.',
                timestamp: new Date().toLocaleString()
            });
            return;
        }
        if (!user.currentRoom) {
            socket.emit('chat message', {
                user: 'System',
                message: 'Please join a room to send messages.',
                timestamp: new Date().toLocaleString()
            });
            return;
        }

        const messageData = {
            user: user.name,
            message: msg,
            timestamp: new Date().toLocaleString(),
            room: user.currentRoom
        };

        await addMessageToRedis(messageData);
        io.to(user.currentRoom).emit('chat message', messageData);
        console.log(`[Room: ${user.currentRoom}] ${user.name}: ${msg}`);
    });
    socket.on('admin message', async (msg) => {
        const user = onlineUsers[socket.id];
        // Check if the user sending the message is an admin
        if (user && user.isAdmin) {
            const messageData = {
                user: 'Admin',
                message: `📢 ${msg}`, // Add a distinctive emoji for announcements
                timestamp: new Date().toLocaleString(),
                isAnnouncement: true, // Flag to help with client-side styling
                room: user.currentRoom || 'global' // Admin message can be room-specific or global
            };

            await addMessageToRedis(messageData); // Store announcement in Redis

            if (user.currentRoom && user.currentRoom !== 'general') {
                // If admin is in a specific room (not 'general'), broadcast to that room
                io.to(user.currentRoom).emit('chat message', messageData);
                console.log(`Admin Announcement [Room ${user.currentRoom}]: ${msg}`);
            } else {
                // Otherwise, broadcast globally to all connected sockets (or 'general' room)
                io.emit('chat message', messageData); // io.emit() sends to all connected sockets
                console.log(`Admin Announcement (Global): ${msg}`);
            }
        } else if (user) {
            // Inform non-admin users they are not authorized
            socket.emit('chat message', {
                user: 'System',
                message: 'You are not authorized to send admin messages.',
                timestamp: new Date().toLocaleString()
            });
        } else {
            // Inform unregistered users
            socket.emit('chat message', {
                user: 'System',
                message: 'You need to register to send messages.',
                timestamp: new Date().toLocaleString()
            });
        }
    });
    socket.on('disconnect', async () => {
        const user = onlineUsers[socket.id];
        if (user) {
            const roomLeft = user.currentRoom; // Get the room the user was in
            delete onlineUsers[socket.id]; // Remove user from in-memory list

            // Update all clients with the new list of online users
            io.emit('update online users', Object.values(onlineUsers).map(u => u.name));

            // Broadcast a system message that the user has left
            const leaveMessage = {
                user: 'System',
                message: `${user.name} has left the chat.`,
                timestamp: new Date().toLocaleString(),
                room: roomLeft // Indicate the room if applicable
            };
            await addMessageToRedis(leaveMessage); // Add leave message to Redis

            if (roomLeft) {
                // If the user was in a room, send the leave message to that room
                io.to(roomLeft).emit('chat message', leaveMessage);
                console.log(`User disconnected: ${user.name} from room ${roomLeft}`);
            } else {
                // If no specific room, broadcast globally (shouldn't happen with default 'general')
                io.emit('chat message', leaveMessage);
                console.log(`User disconnected: ${user.name} (no specific room)`);
            }
        } else {
            console.log('A user disconnected (not registered):', socket.id);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
