const os = require('os');

function getSystemInfo() {
  const cpus = os.cpus();
  const cpuModel = cpus[0].model;
  const cpuSpeed = cpus[0].speed / 1000;
  const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
  const heapUsed = (process.memoryUsage().heapUsed / (1024**2)).toFixed(2);
  const heapTotal = (process.memoryUsage().heapTotal / (1024**2)).toFixed(2);

  console.log(`System Information:\n-------------------------`);
  console.log(`Architecture: ${os.arch()}`);
  console.log(`CPU Cores: ${cpus.length}`);
  console.log(`CPU Model: ${cpuModel}`);
  console.log(`CPU Speed: ${cpuSpeed} GHz`);
  console.log(`Total Memory: ${totalMem} GB`);
  console.log(`Free Memory: ${freeMem} GB`);
  console.log(`Heap Memory Used: ${heapUsed} MB`);
  console.log(`Heap Memory Total: ${heapTotal} MB`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`OS Type: ${os.type()}`);
}

module.exports = { getSystemInfo };
