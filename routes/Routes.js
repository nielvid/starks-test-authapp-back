const express = require("express");
const { Signup, Login, GoogleSignup, GoogleLogin , HomePage, SendMail } = require("../controller/controller");

const route = express.Router();
const {requireLogin} = require("../middleware/auth");

route.get("/user",requireLogin, HomePage );
route.post("/user", Signup);
route.post("/login", Login );
route.post("/google/signup", GoogleSignup)
route.post("/google/login", GoogleLogin )
route.post("/sendmail", SendMail)


module.exports = route;