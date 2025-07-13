// public/script.js

// Establish a Socket.IO connection to the server
const socket = io();

// --- Get DOM Elements ---
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const joinChatButton = document.getElementById('join-chat-button');
const registrationStatus = document.getElementById('registration-status');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('m');
const onlineUsersList = document.getElementById('online-users-list');
const disconnectButton = document.getElementById('disconnect-button');
const adminMessageToggle = document.getElementById('admin-message-toggle');
const adminMessageForm = document.getElementById('admin-message-form');
const adminMessageInput = document.getElementById('admin-m');
const roomNameInput = document.getElementById('room-name-input');
const joinRoomButton = document.getElementById('join-room-button');
const roomStatus = document.getElementById('room-status');

let currentUser = null; // Stores the current user's registered name

// --- Event Listeners ---

// Handle "Join Chat" button click
joinChatButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        socket.emit('register user', username); // Emit 'register user' event to server
    } else {
        registrationStatus.textContent = 'Please enter a username.';
    }
});

// Handle "Join Chat" on Enter key press in username input
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinChatButton.click();
    }
});

// Handle regular message form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    if (messageInput.value.trim()) {
        socket.emit('chat message', messageInput.value.trim()); // Emit 'chat message' event
        messageInput.value = ''; // Clear input field
    }
});

// Handle admin message form submission
adminMessageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (adminMessageInput.value.trim()) {
        socket.emit('admin message', adminMessageInput.value.trim()); // Emit 'admin message' event
        adminMessageInput.value = ''; // Clear input field
    }
});

// Toggle visibility of admin message form
adminMessageToggle.addEventListener('click', () => {
    adminMessageForm.classList.toggle('hidden');
    messageForm.classList.toggle('hidden');
    // Clear inputs when toggling to prevent accidental sending
    messageInput.value = '';
    adminMessageInput.value = '';
});

// Handle "Disconnect" button click
disconnectButton.addEventListener('click', () => {
    socket.disconnect(); // Disconnect from the Socket.IO server
    displayMessageBox('You have been disconnected from the chat.');
    resetUI(); // Reset the UI to the login screen
    console.log('Manually disconnected.');
});

// Handle "Join Room" button click
joinRoomButton.addEventListener('click', () => {
    const roomName = roomNameInput.value.trim();
    if (roomName) {
        socket.emit('join room', roomName); // Emit 'join room' event to server
    } else {
        roomStatus.textContent = 'Please enter a room name.';
    }
});

// Handle "Join Room" on Enter key press in room name input
roomNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinRoomButton.click();
    }
});

// --- Socket.IO Event Handlers ---

// Event: 'registration successful' (from server)
socket.on('registration successful', (userName) => {
    currentUser = userName; // Store the registered username
    loginScreen.classList.add('hidden'); // Hide login screen
    chatScreen.classList.remove('hidden'); // Show chat screen
    registrationStatus.textContent = ''; // Clear any previous registration errors
    roomNameInput.value = 'general'; // Set default room name
    joinRoomButton.click(); // Automatically join the 'general' room
    console.log(`Registered as ${userName}`);
});

// Event: 'registration error' (from server)
socket.on('registration error', (message) => {
    registrationStatus.textContent = message; // Display registration error
    console.error('Registration error:', message);
});

// Event: 'chat history' (from server) - received on connection/room join
socket.on('chat history', (history) => {
    messages.innerHTML = ''; // Clear existing messages before loading history
    history.forEach(data => appendMessage(data)); // Append each historical message
});

// Event: 'chat message' (from server) - received for new messages
socket.on('chat message', (data) => {
    appendMessage(data); // Append the new message to the chat area
});

// Event: 'update online users' (from server)
socket.on('update online users', (users) => {
    onlineUsersList.innerHTML = ''; // Clear previous list
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        onlineUsersList.appendChild(li); // Add each online user to the list
    });
});

// Event: 'room joined' (from server)
socket.on('room joined', (roomName) => {
    roomStatus.textContent = `Joined room: ${roomName}`;
    // messages.innerHTML = ''; // Optional: Clear messages when joining a new room
    console.log(`Successfully joined room: ${roomName}`);
});

// Event: 'room error' (from server)
socket.on('room error', (message) => {
    roomStatus.textContent = message;
    console.error('Room error:', message);
});

// Event: 'disconnect' (from server or client-side initiated)
socket.on('disconnect', () => {
    console.log('Disconnected from server.');
    // Only show message box if the user was actively connected (not just a page refresh before registering)
    if (currentUser) {
        displayMessageBox('You have been disconnected from the chat. Please refresh or rejoin.');
    }
    resetUI(); // Reset UI to login screen
});

// --- Helper Functions ---

/**
 * Appends a message to the chat display area.
 * @param {Object} data - Message object containing user, message, timestamp, and optional isAnnouncement flag.
 */
function appendMessage(data) {
    const item = document.createElement('div');
    item.classList.add('chat-message');

    // Add specific classes for styling different message types
    if (data.isAnnouncement) {
        item.classList.add('announcement');
    } else if (data.user === currentUser) {
        item.classList.add('my-message');
    } else if (data.user === 'System' || data.user === 'Admin') {
        item.classList.add('system-message');
    } else {
        item.classList.add('other-message');
    }

    // Construct the message HTML
    item.innerHTML = `
        <span class="user-name">${data.user}</span>
        <span class="message-content">${data.message}</span>
        <span class="timestamp">${data.timestamp}</span>
    `;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom of the chat
}

/**
 * Resets the UI to the initial login screen state.
 */
function resetUI() {
    loginScreen.classList.remove('hidden');
    chatScreen.classList.add('hidden');
    messages.innerHTML = ''; // Clear all messages
    onlineUsersList.innerHTML = ''; // Clear online users list
    usernameInput.value = ''; // Clear username input
    registrationStatus.textContent = ''; // Clear status messages
    roomStatus.textContent = ''; // Clear room status
    messageInput.value = ''; // Clear message input
    adminMessageInput.value = ''; // Clear admin message input
    adminMessageForm.classList.add('hidden'); // Hide admin form
    messageForm.classList.remove('hidden'); // Show regular message form
    currentUser = null; // Clear current user
}

/**
 * Displays a custom message box instead of alert().
 * @param {string} message - The message to display.
 */
function displayMessageBox(message) {
    // Create a simple modal/message box element
    const messageBox = document.createElement('div');
    messageBox.classList.add('custom-message-box');
    messageBox.innerHTML = `
        <div class="message-box-content">
            <p>${message}</p>
            <button class="message-box-ok">OK</button>
        </div>
    `;
    document.body.appendChild(messageBox);

    // Center the message box
    messageBox.style.display = 'flex';
    messageBox.style.justifyContent = 'center';
    messageBox.style.alignItems = 'center';
    messageBox.style.position = 'fixed';
    messageBox.style.top = '0';
    messageBox.style.left = '0';
    messageBox.style.width = '100%';
    messageBox.style.height = '100%';
    messageBox.style.backgroundColor = 'rgba(0,0,0,0.5)';
    messageBox.style.zIndex = '1000';

    // Style the content
    const content = messageBox.querySelector('.message-box-content');
    content.style.backgroundColor = '#fff';
    content.style.padding = '20px';
    content.style.borderRadius = '8px';
    content.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    content.style.textAlign = 'center';
    content.style.maxWidth = '300px';
    content.style.width = '90%';

    const okButton = messageBox.querySelector('.message-box-ok');
    okButton.style.marginTop = '15px';
    okButton.style.padding = '8px 20px';
    okButton.style.backgroundColor = '#007bff';
    okButton.style.color = 'white';
    okButton.style.border = 'none';
    okButton.style.borderRadius = '5px';
    okButton.style.cursor = 'pointer';
    okButton.style.fontSize = '16px';

    // Close message box when OK is clicked
    okButton.addEventListener('click', () => {
        document.body.removeChild(messageBox);
    });
}
