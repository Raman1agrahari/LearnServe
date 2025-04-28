const express = require("express");
const router = express.Router();
const authcontrolers = require("../controllers/auth.controller");
const signupSchema = require("../validator/auth.validator");
const validate = require("../middleware/validate.middleware");
const authMiddleware = require("../middleware/auth.middleware");



router.route("/").get(authcontrolers.home);

router.route("/register").post(validate(signupSchema), authcontrolers.register);
router.route("/login").post(authcontrolers.login);

router.route("/user").get(authMiddleware, authcontrolers.user);

 


module.exports = router;

 