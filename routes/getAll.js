const router = require("express").Router();
const User = require("../models/user");
const checkAuth = require("../utils/checkAuth");

router.get("/", checkAuth, async (req, res) => {
  try {
    const name = req.name;
    const _id = req.userId;
    const users = await User.find();
    res.status(200).json({ users, name, _id });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
