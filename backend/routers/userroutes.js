const express = require("express");
const { protectRoute } = require("../middleware/protectedRoute");
const  getUsersForSidebar  = require("../controllers/usercotroller");

const router = express.Router();

router.get('/',protectRoute,getUsersForSidebar);
// router.route("/").get(protectRoute,getUsersForSidebar);

module.exports = router;
