const router = require("express").Router();
const User = require("../models/user");

router.put("/", async (req, res) => {
  try {
    const users = req.body.users;
    const status = req.body.status;
    for (let user of users) {
      user.status = status;
    }
    let updatedUsers = [];
    for (let user of users) {
      if (!user._id) return res.status(401).json({ message: "Check request" });
      updatedUsers = [
        ...updatedUsers,
        await User.findByIdAndUpdate(user._id, user, {
          new: true,
        }),
      ];
    }
    res.status(200).json(updatedUsers);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
