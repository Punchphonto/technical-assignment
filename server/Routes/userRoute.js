const express = require("express");
const { registerUser, login, getUserById, getUsers } = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", login)
router.get("/get_user/:userId", getUserById)
router.get("/get_users", getUsers)

module.exports = router