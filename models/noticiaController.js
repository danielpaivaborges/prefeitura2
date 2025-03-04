const express = require("express");
const router = express.Router();
const Noticias = require("./Noticia");
const slugify = require("slugify");
const multer = require("multer");
const storage = require("../multerConfig");
const adminAuth = require("../middlewares/adminAuth");
const upload = multer({ storage: storage });

// CADASTRAR NOTÍCIA
router.get("/admin/new", adminAuth, (req, res) => {
  res.render("admin/cadastrar-noticia");
});

// SALVAR NOTÍCIA
router.post("/admin/saveNoticia", upload.single("file"), (req, res) => {
  const { data, title, body } = req.body;

  Noticias.create({
    //mudar o formato da data para pt-br
    date: data.split("-").reverse().join("/"),
    title: title,
    slug: slugify(title),
    body: body,
    fotoId: req.file.filename,
    autor: req.session.user.email
  })
    .then(() => {
      res.redirect("/admin/gerenciarNoticias");
    })
    .catch((error) => {
      res.send(error);
    });
});

// EDITAR NOTÍCIA
router.get("/admin/editNoticia/:id", adminAuth, (req, res) => {
  let id = req.params.id;
  Noticias.findOne({ where: { id: id } })
    .then((noticia) => {
      res.render("admin/editar-noticia", {
        noticia: noticia,
        data: noticia.date.split("/").reverse().join("-")
      });
    })
    .catch((error) => {
      res.redirect("/");
    });
});

// SALVAR NOTÍCIA ATUALIZADA
router.post("/admin/updateNoticia", upload.single("file"), (req, res) => {
  const date = req.body.data.split("-").reverse().join("/");
  const title = req.body.title;
  const body = req.body.body;
  const slug = slugify(title);
  const fotoId = req.file.filename;
  const id = req.body.id;

  Noticias.update(
    {
      date: date,
      title: title,
      body: body,
      slug: slug,
      fotoId: fotoId
    },
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    res.redirect("/");
  });
});

// GERENCIAR NOTÍCIA
router.get("/admin/gerenciarNoticias", adminAuth, (req, res) => {
  Noticias.findAll({ order: [["date", "DESC"]] }).then((noticias) => {
    res.render("admin/gerenciarNoticias", { noticias: noticias });
  });
});

// DELETAR NOTÍCIA
router.post("/admin/apagarNoticia", (req, res) => {
  let id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Noticias.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/gerenciarNoticias");
      });
    } else {
      res.redirect("/admin/gerenciarNoticias");
    }
  } else {
    res.redirect("/admin/gerenciarNoticias");
  }
});

router.get("/noticia/:id", (req, res) => {
  const id = req.params.id;
  Noticias.findOne({ where: { id: id } })
    .then((noticia) => {
      res.render("noticia", { noticia: noticia });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/noticias", (req, res) => {
  Noticias.findAll({ order: [["id", "DESC"]] })
    .then((noticias) => {
      res.render("noticias", { noticias: noticias });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
