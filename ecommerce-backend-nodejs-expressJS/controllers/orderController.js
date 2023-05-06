const { Order } = require("../models/order");
exports.createOrder = (req, res) => {
  console.log(req.body)
  req.body = {
    ...req.body,
    user: req.profile,
  };

  const order = new Order(req.body);

  order.save((err, data) => {
    console.log(data)
    if(err) {
      return res.status(400).json({ error: err.message });
    }

    res.json(data)

  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json(orders);
    });
};

exports.getStatus = (req, res) => {
  return res.json({ status: Order.schema.path('status').enumValues })
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.order._id },
    { $set: { status: req.body.status } },
    (err, data) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json(data);
    }
  );
};
