const express = require("express");
const router = express.Router();
const checkDatas = require("../middlewares/checkDataUserCreate");
const ProductController = require("../controllers/ProductsController");

router.post("/criar", ProductController.store);
router.put("/atualizar/:id", ProductController.update);
router.get("/", ProductController.index);
router.get("/:id", ProductController.show);

module.exports = router;
