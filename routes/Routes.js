const express = require("express");
const { AddUser, Login, HomePage } = require("../controller/controller");

const route = express.Router();
const {requireLogin} = require("../middleware/auth");



route.get("/user", requireLogin, HomePage );

route.post("/user", AddUser);


route.post("/login", Login );

module.exports = route;