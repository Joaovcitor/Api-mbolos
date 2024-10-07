const express = require("express");
const router = express.Router();
const checkDatas = require("../middlewares/checkDataUserCreate");
const { Store } = require("../controllers/Users");

router.post("/criar", checkDatas, Store);

module.exports = router;
