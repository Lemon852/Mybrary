if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./.env" });
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
const bodyParser = require('body-parser')

app.set("view engine", "ejs"); // this is view engine as ejs
app.set("views", __dirname + "/views"); // this will  say where our views are comming from
app.set("layout", "layouts/layout"); // so this will allow us to use layout on multiple time for top and bottom html
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.listen(process.env.PORT || 3000);
