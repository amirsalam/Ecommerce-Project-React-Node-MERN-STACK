const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User no found !",
      });
    }
    req.profile = user;
    next();
  });
};

exports.addProductsToUserHistory = (req, res, next) => {
  let history = [];
  history = req.body.products.map(product => {
    return {
      _id: product._id,
      name: product.name,
      description: product.description,
      quantity: product.count,
      amount: product.price * product.count,
      transact_id: req.body.transaction_id,
    };
  })
  
  if (history.length) {
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { history } },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({ error: "could not update user history !" });
        }

        return next();
      }
    );
  }
  next();
}
