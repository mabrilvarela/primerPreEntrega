const express = require("express");
const app = express();
const exphbs = require("express-handlebars")
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const mongoose = require("mongoose")
require("./database.js");

const ProductManager = require("../src/controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

mongoose.connect("mongodb+srv://mabrilvarela:coderhouse@cluster0.ddtseea.mongodb.net/Tienda?retryWrites=true&w=majority")
    .then(() => console.log("Conectados a la BD"))
    .catch((error) => console.log(error))