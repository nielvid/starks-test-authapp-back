/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require("express");
const path = require("path");
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

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json()); // for body parser
// app.use(express.urlencoded({extended: false}) ) // for body parser
app.use("/api", Route);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message,
    data: null
  });
});

// serve build if on production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  // get anything, load index.html
  app.get("*", (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(path.resolve(__dirname, "client", "build", index.html));
  });
}

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 5000, () => {
   console.log(`Server running on port ${process.env.PORT} or 5000`);
});
