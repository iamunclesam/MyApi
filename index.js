const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_mongodb.js");

const PORT = process.env.PORT || 8080;
const productRoute = require("./routes/productRoutes.js");
const categoryRoute = require("./routes/categoryRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const cartRoute = require("./routes/cartRoute.js")
const AuthRoute = require("./routes/Auth_route.js");
const { verifyAccessToken } = require("./helpers/jwt_helper.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", verifyAccessToken, (req, res) => {
  res.send({message: "Welcome"});
});

//routes
app.use("/api", productRoute, categoryRoute, userRoute, cartRoute);
app.use("/api/auth", AuthRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
