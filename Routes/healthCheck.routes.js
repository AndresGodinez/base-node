const express = require("express");
const {healthCheck} = require("../Controllers/healtCheckController");
const router = express.Router();

router.get("/", healthCheck);

module.exports = router;
