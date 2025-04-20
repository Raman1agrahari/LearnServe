require("dotenv").config();
const express = require("express");
const app = express();
const authrouter = require("./router/auth.router");
const contactRoute = require("./router/contact.router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error.middleware");
 

app.use(express.json()); 

app.use("/api/auth",authrouter);
app.use("/api/form",contactRoute );

app.use(errorMiddleware); 

const PORT = 3000;

 connectDb().then( () => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
 });
  