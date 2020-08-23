require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const authRoutes = require("./routes/auth")
const cors = require("cors");

//middlewares
app.use(bodyParser.json());

//MyRoutes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
app.use("/api",authRoutes)

//DataBase Connectivity

mongoose.connect('mongodb://localhost:27017/APi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(()=>{
        console.log("DB Conneted")

      });
      //myroutes
app.use("/api", authRoutes);
app.use("/api",userRoutes);

//Port
const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`App is running at ${port}`)
})
