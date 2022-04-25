const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set(`views`, `./views`);
app.set("view engine", "hbs");

const Contenedor = require("./contenedor");
const contenedor = new Contenedor("productos.js");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get(`/productos`, async (req, res) => {
  const productosLista = await contenedor.getAll();
  res.render(`pages/list.hbs`, {
    productosLista,
  });
  console.log(productosLista);
});

app.get("/", (req, res) => {
  res.render("pages/form.hbs", {});
});

app.post("/productos", async (req, res) => {
  const { title, price } = req.body;
  await contenedor.save(title, price);
  res.redirect("/productos");
  console.log(body);
});

app.listen(PORT, () => {
  console.log(`Sv ${PORT}`);
});
