const express = require("express");
const {
  createProduct,
  showProduct,
  productById,
  removeProduct,
  updateProduct,
  allProducts,
  relatedProduct,
  searchProduct,
  photoProduct,
} = require("../controllers/productController");
const router = express.Router();

const { isAuth, isAdmin, requireSignIn } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
router.get("/", allProducts);
router.get("/:productId", showProduct);
router.get("/related/:productId", relatedProduct);
router.post("/create/:userId", [requireSignIn, isAuth, isAdmin], createProduct);
router.post("/search", searchProduct);
router.post("/photo/:productId", photoProduct);
router.put(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateProduct
);
router.delete(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
