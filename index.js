const express = require("express");
const app = express();
const router = require('./rotas/rotas')

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/', router)


app.listen(3000, () => {
  console.log("Servidor online");
});
