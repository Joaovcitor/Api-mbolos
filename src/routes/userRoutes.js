const express = require("express");
const router = express.Router();
const checkDatas = require("../middlewares/checkDataUserCreate");
const UsersController = require("../controllers/UsersController");

router.post("/criar", checkDatas, UsersController.Store);

module.exports = router;
