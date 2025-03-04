"use strict";
const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/users",adminAuth,  (req, res) => {
  User.findAll().then((users) => {
    res.render("admin/gerenciarUsuarios", { users: users });
  });
});

router.get("/admin/users/create",adminAuth,  (req, res) => {
  res.render("admin/cadastrar-user");
});

router.post("/admin/saveUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //verificando se ja existe o email cadastrado
  User.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash
      })
        .then(() => {
          res.redirect("/admin/users");
        })
        .catch((err) => {
          res.send("Erro ao cadastrar usuário: " + err);
        });
    } else {
      res.redirect("/admin/users/create");
    }
  });
});

router.post("/admin/apagarUsuario", (req, res) => {
  const id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      User.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/users");
      });
    } else {
      res.redirect("/admin/users");
    }
  } else {
    res.redirect("/admin/users");
  }
});

router.get("/admin/login", (req, res) => {
  res.render("admin/login");
});

router.post("/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } }).then((user) => {
    if (user != undefined) {
      const correct = bcrypt.compareSync(password.toString(), user.password);
      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        };     
        res.redirect("/admin/gerenciarNoticias");   
      } else {
        res.redirect("/admin/login");
      }
    } else {
      res.redirect("/admin/login");
    }
  });
});

//DESLOGAR USUARIO
router.get("/admin/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/admin/login");
});


module.exports = router;
