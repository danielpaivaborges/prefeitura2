"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/detail-page", (req, res) => {
  res.render("detail-page");
});

module.exports = router;
