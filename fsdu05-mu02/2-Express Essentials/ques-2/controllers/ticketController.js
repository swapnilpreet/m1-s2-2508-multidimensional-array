const model = require("../models/ticketModel");

let idCounter = 1;

exports.getAllTickets = (req, res) => {
  res.json(model.getAllTickets());
};

exports.getTicketById = (req, res) => {
  const ticket = model.getTicketById(+req.params.id);
  if (!ticket) return res.status(404).send("Ticket not found");
  res.json(ticket);
};

exports.createTicket = (req, res) => {
  const ticket = {
    id: idCounter++,
    ...req.body,
    status: "pending"
  };
  model.addTicket(ticket);
  res.status(201).json(ticket);
};

exports.updateTicket = (req, res) => {
  const updated = model.updateTicket(+req.params.id, req.body);
  if (!updated) return res.status(404).send("Ticket not found");
  res.send("Ticket updated successfully");
};

exports.deleteTicket = (req, res) => {
  const deleted = model.deleteTicket(+req.params.id);
  if (!deleted) return res.status(404).send("Ticket not found");
  res.send("Ticket deleted successfully");
};

exports.resolveTicket = (req, res) => {
  const updated = model.updateTicket(+req.params.id, { status: "resolved" });
  if (!updated) return res.status(404).send("Ticket not found");
  res.send("Ticket resolved");
};
