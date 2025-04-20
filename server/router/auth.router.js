const express = require("express");
const router = express.Router();
const authcontrolers = require("../controllers/auth.controller");
const signupSchema = require("../validator/auth.validator.js");
const validate = require("../middleware/validate.middleware.js");



router.route("/").get(authcontrolers.home);

router.route("/register").post(validate(signupSchema), authcontrolers.register);
router.route("/login").post(authcontrolers.login);
 


module.exports = router;

 