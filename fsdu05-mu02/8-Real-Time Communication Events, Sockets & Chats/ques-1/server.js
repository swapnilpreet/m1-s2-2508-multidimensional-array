const EventEmitter = require('events');
const eventBus = new EventEmitter();
eventBus.on('userLoggedIn', (username) => {
  console.log(`> User ${username} logged in`);
});

eventBus.on('userLoggedIn', (username) => {
  console.log(`> Notification sent to ${username}`);
});

eventBus.on('dataSynced', (username) => {
  console.log(`> Syncing user data...`);
  setTimeout(() => {
    console.log(`> Data sync complete`);
  }, 1000);
});
function simulateApp() {
  const user = 'John';
  setTimeout(() => {
    eventBus.emit('userLoggedIn', user);
  }, 1000);
  setTimeout(() => {
    eventBus.emit('dataSynced', user);
  }, 3000);
}

simulateApp();
