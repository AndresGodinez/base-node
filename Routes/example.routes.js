const express = require("express");
const router = express.Router();

const {getIndex} = require("../Controllers/indexController");

router.get("/", getIndex);

module.exports = router;
