const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();


router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);

module.exports = router;