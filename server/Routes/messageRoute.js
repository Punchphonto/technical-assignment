const express = require("express");
const { createmessage, getMessages } = require("../Controllers/messageController");

const router = express.Router();

router.post("/", createmessage)
router.get("/:chatId", getMessages)

module.exports = router;