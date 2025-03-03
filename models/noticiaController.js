const express = require("express");
const router = express.Router();
const Noticias = require("./Noticia");
const slugify = require("slugify");
const multer = require("multer");
const storage = require("../multerConfig");

const upload = multer({ storage: storage });

router.get("/admin", (req, res) => {});

router.get("/admin/new", (req, res) => {
  res.render("admin/new");
});

router.post("/admin/saveNoticia", upload.single("file"), (req, res) => {
  const { data, title, body } = req.body;

  Noticias.create({
    //mudar o formato da data para pt-br
    date: data.split("-").reverse().join("/"),
    title: title,
    slug: slugify(title),
    body: body,
    fotoId: req.file.filename
  })
    .then(() => {
      res.redirect("/admin/gerenciarNoticias");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/admin/gerenciarNoticias", (req, res) => {
  Noticias.findAll().then((noticias) => {
    res.render("admin/gerenciarNoticias", { noticias: noticias });
  });
});

router.get("/admin/noticiaView/:id", (req, res) => {
  const id = req.params.id;
  Noticias.findOne({ where: { id: id } })
    .then((noticia) => {
      res.render("admin/noticiaView", { noticia: noticia });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
