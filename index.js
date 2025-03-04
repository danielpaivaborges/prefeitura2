const express = require("express");
const app = express();
const router = require("./rotas/rotas");
const https = require("https");
const fs = require("fs");
const http = require("http");
const port = 21138;
const bodyparser = require("body-parser");
const conexaoNoticias = require("./database/noticiasbd");
const noticiaController = require("./models/noticiaController");
const userController = require("./models/userController");
const session = require("express-session");

// CONFIGURANDO O ACESSO SSL
const key = fs.readFileSync(__dirname + "/certificado/private.key");
const cert = fs.readFileSync(__dirname + "/certificado/certificate.crt");
const options = {
  key: key,
  cert: cert
};

//CONFIGURANDO O APLICATIVO
app.set("view engine", "ejs");
//CONFIGURANDO A SESSÃO
app.use(
  session({
    secret: "palavra_qualquer",
    cookie: { maxAge: 43200000},
    resave: true,
    saveUninitialized: true
  })
);
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyparser.json({ limit: "10mb" }));
app.use("/", router);
app.use("/", noticiaController);
app.use("/", userController);



//TEMPORARIO
// app.get("/session", (req, res) => {
//   req.session.treinamento = "Curso de Node.js";
//   req.session.ano = 2025;
//   req.session.dados = { nome: "Daniel", idade: 51 };
//   res.send("Sessão criada");
// });

// app.get("/leitura", (req, res) => {
//   res.json(req.session);
// });

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


