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

router.get("/historia", (req, res) => {
  res.render("historia");
});

router.get("/captacao", (req, res) => {
  res.render("captacao");
});

router.get("/festas", (req, res) => {
  res.render("festas");
});

router.get("/admin/cadastrar-noticia", (req, res) => {
  res.render("admin/cadastrar-noticia");
});

router.get("/admin/noticiasGerenciar", (req, res) => {
  res.render("admin/noticiasGerenciar");
});

module.exports = router;
