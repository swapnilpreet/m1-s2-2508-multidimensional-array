function delayMessage(message, time) {
  return new Promise((resolve, reject) => {
    if (!message || isNaN(time)) {
      return reject("Invalid message or time.");
    }
    setTimeout(() => {
      resolve(message);
    }, parseInt(time));
  });
}

module.exports = delayMessage;
