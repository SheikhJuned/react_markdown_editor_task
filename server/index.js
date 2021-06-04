const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

//Connect to DB
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
// mongoose.connect("mongodb+srv://albertfox:Cx6W3sN7zCWxvha@cluster0.xtitr.mongodb.net/myFirstDatabase?retryWrites=true", { useNewUrlParser: true }, () =>
  console.log("connected to DB!")
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(4000, () => console.log("Server Up and running"));
