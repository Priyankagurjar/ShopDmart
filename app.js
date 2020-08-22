// require("dotenv").config();

// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/auth")
// //middlewares
// app.use(bodyParser.json())
// //MyRoutes

// app.use("/api",authRoutes)

// //DataBase Connectivity

// mongoose.connect('mongodb://localhost:27017/APi', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     }).then(()=>{
//         console.log("DB Conneted")
//     });




// //Port
// const port = process.env.PORT || 8000;

// app.listen(port, ()=>{
//     console.log(`App is running at ${port}`)
// })
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors= require('cors');
const authRoutes = require('./routes/auth');

//DB connection
const app = express();
mongoose.connect('mongodb://localhost:27017/APi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB CONNECT");
});
//MiddleWare

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes API

app.use("/api",authRoutes);

//Port
const port = process.env.PORT || 8000;

//Server
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
