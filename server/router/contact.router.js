const express = require("express");
const router = express.Router();
const contactFrom = require("../controllers/contact.controller");
 



router.route("/contact").post(contactFrom);
 


module.exports = router;