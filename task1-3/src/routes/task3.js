const express = require("express");
const { calculateArray } = require("../controller/task3");
const router = express.Router();

router.get("/", calculateArray);
module.exports = router;
