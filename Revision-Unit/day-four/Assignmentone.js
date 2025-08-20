const EventEmitter = require("events");

const eventBus = new EventEmitter();

eventBus.on("userLoggedIn", (username) => {
  console.log(`> User ${username} logged in`);
});

eventBus.on("userLoggedIn", (username) => {
  console.log(`> Notification sent to ${username}`);
});

eventBus.on("messageReceived", (username, message) => {
  console.log(`> ${username} received a new message: "${message}"`);
});

eventBus.on("dataSynced", (username) => {
  console.log(`> Syncing data for ${username}...`);
  setTimeout(() => {
    console.log(`> Data sync complete for ${username}`);
  }, 2000);
});


function simulateApp() {
  const user = "John";
  setTimeout(() => {
    eventBus.emit("userLoggedIn", user);
    setTimeout(() => {
      eventBus.emit("messageReceived", user, "Welcome to the system!");
      setTimeout(() => {
        eventBus.emit("dataSynced", user);
      }, 1000);

    }, 2000);
  }, 1000);
}

simulateApp();
