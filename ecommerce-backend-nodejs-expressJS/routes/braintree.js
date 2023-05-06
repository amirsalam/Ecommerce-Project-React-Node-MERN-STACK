const express = require("express");
const {
  generateToken,
  processPayement,
} = require("../controllers/braintreeController");
const { isAuth, requireSignIn } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
const router = express.Router();

router.get("/getToken/:userId", [requireSignIn, isAuth], generateToken);
router.post("/purchase/:userId", [requireSignIn, isAuth], processPayement);
router.param("userId", userById);
module.exports = router;
