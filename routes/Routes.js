const express = require("express");
const { Signup, Login, GoogleSignup, GoogleLogin , HomePage } = require("../controller/controller");

const route = express.Router();
const {requireLogin} = require("../middleware/auth");

route.get("/user",requireLogin, HomePage );
route.post("/user", Signup);
route.post("/login", Login );
route.post("/google/signup", GoogleSignup)
route.post("/google/login", GoogleLogin )


module.exports = route;