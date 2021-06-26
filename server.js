/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Route = require("./routes/Routes");

dotenv.config();

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_CONNECT_LOCAL, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

app.use(cors({
 "Access-Control-Allow-Origin": "*"
}));

app.use(express.json()); 

app.use("/", Route);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message,
    data: null
  });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 5000, () => {
   console.log(`Server running on port 5000`);
});
