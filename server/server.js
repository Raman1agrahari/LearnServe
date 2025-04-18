const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to thapa technical Mern Series Updated");
});

app.get("/register", (req, res) => {
  res.status(200).json({ msg: "registration successful" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});