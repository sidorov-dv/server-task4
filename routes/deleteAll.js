const router = require("express").Router();
const User = require("../models/user");

router.delete("/", async (req, res) => {
  try {
    const deleteUsers = await User.deleteMany({});
    if (!deleteUsers)
      return res.status(401).json({ message: "Nothing to delete" });
    res.status(200).json({ message: "Delete all successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
