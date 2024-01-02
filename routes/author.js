const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//all the author router
router.get("/", (req, res) => {
  res.render("authors/index");
});

// all the new author router
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create new author router
router.post("/", (req, res) => {
  res.send("Create");
});

module.exports = router;
