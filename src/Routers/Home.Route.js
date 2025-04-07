const express = require("express");
const router = express.Router();
const GetHome = require("../Controllers/Home.Controllers");

router.get("/", GetHome);

module.exports = router;