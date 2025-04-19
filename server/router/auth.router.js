const express = require("express");
const router = express.Router();
const authcontroolers = require("../controllers/auth.controller");
router.route("/").get(authcontroolers.home);

router.route("/register").post(authcontroolers.register);

 


module.exports = router;

 