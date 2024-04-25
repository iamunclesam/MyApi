const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoutes.js");
const userRoute = require("./routes/userRoutes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/", productRoute);
app.use("/api/", userRoute);

app.get("/", (req, res) => {
  res.send({
    name: "Adeyemi",
    occupation: "Software Developer",
  });
});

mongoose
  .connect(
    "mongodb+srv://adeyemis958:21gDfk54C2hU3QWi@test-server.alul3vt.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=Test-Server"
  )
  .then(() => {
    console.log("Connected Database");
  })

  .catch(() => {
    console.log("Connection Failed");
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
