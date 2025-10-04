const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controllers");
const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/roles");

router.post("/create", authMiddleware, isAdmin, boardController.createBoard);
router.post("/invite", authMiddleware, boardController.inviteMenmber);
router.get("/", authMiddleware, boardController.getBoard);
router.delete("/:id", authMiddleware, isAdmin, boardController.deleteBoard);

module.exports = router;
