const router = require("express").Router();
const User = require("../models/user");

router.delete("/", async (req, res) => {
  try {
    const ids = req.body.deleteIds;
    if (!ids) return res.status(401).json({ message: "This ids not exist" });
    const deleteUsers = await User.deleteMany({ _id: ids });
    if (!deleteUsers)
      return res.status(401).json({ message: "Nothing to delete" });
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
