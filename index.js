const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
dotenv.config();

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/gitclone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connect");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(7000, () => {
  console.log("backend running");
});
