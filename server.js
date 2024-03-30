const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const { PORT } = require("./config/port");

const fileManager = require("./routes/fileManager");
const account = require("./routes/account");
const city = require("./routes/city");
const category = require("./routes/category");
const post = require("./routes/post");

var app = express()

mongoose.set("strictQuery", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(express.static("public"));

connectDB();
app.use("/", fileManager);
app.use("/", account);
app.use("/city", city);
app.use("/category", category);
app.use("/post", post);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});