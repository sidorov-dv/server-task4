const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      req.userId = decoded._id;
      req.name = decoded.name;
      next();
    } catch (err) {
      return res.status(403).json({
        message: `Access denied`,
      });
    }
  } else {
    return res.status(403).json({
      message: `Access denied`,
    });
  }
};

module.exports = checkAuth;
