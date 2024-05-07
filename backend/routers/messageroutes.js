const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("../controllers/messagecontroller");
const { protectRoute } = require("../middleware/protectedRoute");

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
