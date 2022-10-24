const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();


router.post("/signup", userController.signup);
// router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);
// router.get("/me", userController.getMe);

module.exports = router;