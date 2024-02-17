const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const ProductManager = require("../src/controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});