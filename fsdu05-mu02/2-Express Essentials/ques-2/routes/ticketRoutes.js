const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/ticketController");
const validate = require("../middlewares/dataCheckMiddleware");

router.get(`/`,ctrl.getAllTickets);
router.get(`/:id`,ctrl.getTicketById);
router.post(`/`,validate, ctrl.createTicket);
router.put(`/:id`,ctrl.updateTicket);
router.delete(`/:id`,ctrl.deleteTicket);
router.patch(`/:id/resolve`,ctrl.resolveTicket);

module.exports = router;
