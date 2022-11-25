const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("name", "Min length is 3").isLength({ min: 3 }),
    check("email", "Uncorrect email").isEmail(),
    check("password", "Min length is 1").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Сheck registration requirements",
        });
      }
      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .json({ message: "User with given email already exist!" });
      const salt = await bcrypt.genSalt(5);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
