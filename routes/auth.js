const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("email", "Uncorrect email").isEmail(),
    check("password", "Min length is 1").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Email or password failed",
        });
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).json({ message: "Invalid email or password" });
      const updatedUser = await User.findOneAndUpdate(user._id, user, {
        new: true,
      });
      const token = user.generateAuthToken();
      if (!updatedUser.status)
        return res.status(401).json({ message: "User has been blocked" });
      res
        .status(200)
        .json({ updatedUser, token, message: "Logged in successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
