const Sequelize = require("sequelize");
const connectionNoticias = require("../database/noticiasbd");

const Noticia = connectionNoticias.define("noticias", {
  date: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fotoId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  autor: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

  //  Noticia.sync({force: true})

module.exports = Noticia;
