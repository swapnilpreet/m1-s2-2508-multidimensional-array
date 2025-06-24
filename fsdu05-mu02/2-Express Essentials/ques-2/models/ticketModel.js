const fs = require("fs");
const path = "./db.json";

function readData() {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
  getAllTickets: () => readData().tickets,
  getTicketById: (id) => readData().tickets.find(t => t.id === id),
  addTicket: (ticket) => {
    const data = readData();
    data.tickets.push(ticket);
    writeData(data);
  },
  updateTicket: (id, updates) => {
    const data = readData();
    const index = data.tickets.findIndex(t => t.id === id);
    if (index !== -1) {
      data.tickets[index] = { ...data.tickets[index], ...updates };
      writeData(data);
      return true;
    }
    return false;
  },
  deleteTicket: (id) => {
    const data = readData();
    const updated = data.tickets.filter(t => t.id !== id);
    if (updated.length === data.tickets.length) return false;
    data.tickets = updated;
    writeData(data);
    return true;
  }
};
