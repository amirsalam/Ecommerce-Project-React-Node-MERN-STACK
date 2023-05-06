const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
// imports Routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/orders");

// config App

const app = express();
require("dotenv").config();

// connect db mongoDB

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("db connected"))
  .catch(() => console.log("db not connect"));

/*****Middelewares**** */
app.use(expressValidator());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes middleware

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/braintree", braintreeRoutes);
app.use("/api/order", orderRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app running in port ${port}`));

