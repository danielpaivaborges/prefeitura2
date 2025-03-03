const express = require("express");
const app = express();
const router = require("./rotas/rotas");
const https = require("https");
const fs = require("fs");
const http = require("http");
const port = 21138;
const bodyparser = require("body-parser");
const conexaoNoticias = require("./database/noticiasbd");
const noticiaController = require('./models/noticiaController')


// CONFIGURANDO O ACESSO SSL
const key = fs.readFileSync(__dirname + "/certificado/private.key");
const cert = fs.readFileSync(__dirname + "/certificado/certificate.crt");
const options = {
  key: key,
  cert: cert
};

//CONFIGURANDO O APLICATIVO
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyparser.json({ limit: "10mb" }));
app.use("/", router);
app.use('/', noticiaController)

// CONECTAR BANCO DE DADOS DE NOTICIAS
conexaoNoticias
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados de notícias estabelecida.");
  })
  .catch((erro) => {
    console.log("Erro ao conectar com o banco de dados de notícias: " + erro);
  });

//CRIANDO O SERVIDOR SSL
const server = https.createServer(options, app);

//INICIANDO O SERVIDOR SSL
server.listen(port, () => {
  console.log("Servidor institucional rodando na porta " + port);
});
