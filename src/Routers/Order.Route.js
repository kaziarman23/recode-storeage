const express = require("express");
const router = express.Router();
const {
  GetAllOrders,
  GetOrder,
  CreateOrder,
  CreateOrders,
  UpdateOrder,
  DeleteOrder,
  DeleteAllOrders,
} = require("../Controllers/Order.Controllers");

router.get("/", GetAllOrders);

router.get("/:id", GetOrder);

router.post("/", CreateOrder);

router.post("/many", CreateOrders);

router.patch("/:id", UpdateOrder);

router.delete("/:id", DeleteOrder);

router.delete("/", DeleteAllOrders);

module.exports = router;