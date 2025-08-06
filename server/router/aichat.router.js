const express = require("express");
const router = express.Router();
const { askAI } = require("../controllers/chat.controller");

console.log("aichat.router.js loaded");

router.route("/ask-ai").post((req, res, next) => {
    console.log("Request hit /api/chat/ask-ai route");
    next();
}, askAI);



module.exports = router;



