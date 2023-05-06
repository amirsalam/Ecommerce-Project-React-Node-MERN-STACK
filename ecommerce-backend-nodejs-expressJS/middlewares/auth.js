const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();
exports.requireSignIn = jwt({
  secret: process.env.SECRET_JWT,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: "access denied !",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role == 0) {
    return res.status(403).json({
      error: "Admin Resource, access denied !",
    });
  }

  next();
};
