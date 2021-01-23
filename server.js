const express = require ('express');
const path = require('path')
const cors = require("cors");
var app =  express()
var Route = require('./routes/Routes')
var mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT , {useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false,  useCreateIndex: true,})
.then((response)=>{
	
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

// serve build if on production
if(process.env.NODE_ENV === "production"){

  //set static folder
  app.use(express.static('client/build'))

  //get anything, load index.html
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', index.html))
  })
}

app.listen(process.env.PORT || 5000, (req, res)=>{
	console.log(`Server Started on port PORT or 5000`)
})



