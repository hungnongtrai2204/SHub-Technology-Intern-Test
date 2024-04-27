const express = require("express");
const { saveFinancial } = require("../controller/task1");
const router = express.Router();

router.get("/", saveFinancial);
module.exports = router;
