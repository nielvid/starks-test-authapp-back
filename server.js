const express = require ('express');
const BodyParser = require('body-parser')
const cors = require("cors");
var app =  express()
var Route = require('./routes/Routes')
var mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(process.env.DB_CONNECT_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((response)=>{
	app.listen(process.env.PORT || 5000 )
	console.log(`Server Started at port or 5000`)
    console.log("Connected to database")

	
})
.catch((err)=>console.log(err))

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json()); // for body parser
//app.use(express.urlencoded({extended: false}) ) // for body parser
app.use (Route)





