require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authrouter = require("./router/auth.router");
const contactRoute = require("./router/contact.router");
const serviceRoute = require("./router/service.router");
const adminRoute = require("./router/admin.router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error.middleware");
 
const corsOptions = {
  origin:["http://localhost:5173", "https://learnserve-server.onrender.com"],
  methods:"GET, POST, PUT,DELETE, PATCH, HEAD",
  credentials:true,
};

app.use(cors(corsOptions));
app.use(express.json()); 

app.use("/api/auth",authrouter);
app.use("/api/form",contactRoute );
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);

app.use(errorMiddleware); 

const PORT = process.env.PORT || 3000;


 connectDb().then( () => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
 });
  