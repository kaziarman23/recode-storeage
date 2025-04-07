const express = require("express");
const router = express.Router();
const {
  GetAllUsers,
  GetOneUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  DeleteAllUser,
  CreateUsers,
} = require("../Controllers/User.Controllers");

router.get("/", GetAllUsers);

router.get("/:id", GetOneUser);

router.post("/", CreateUser);

router.post("/many", CreateUsers);

router.patch("/:id", UpdateUser);

router.delete("/:id", DeleteUser);

router.delete("/", DeleteAllUser);

module.exports = router;