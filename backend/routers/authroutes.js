const express = require('express');
const { signup } = require('../controllers/authcontrollers.js');

const router = express.Router();

router.post("/signup",signup)
// router.post("/login");
// router.post("/logout");

 

module.exports = router;