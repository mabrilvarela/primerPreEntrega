const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cartManager-db.js");
const cartManager = new CartManager();

router.post("/api/carts", async (req, res) => {
    const newCarts = req.body;
    const newCart = {
        id: ++cartManager,
        products: [
        title,
        description,
        price,
        img,
        code,
        stock,
        category
        ]
    }

    this.carts.push(newCarts);

    await this.saveFile(this.carts)

    try {
        await cartManager.addCart(newCart);
        res.status(201).json({message: "Carrito agregado con éxito"})
    } catch (error) {
        console.log("Hubo un error al agregar el carrito", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.get("/api/carts/:cid", async (req, res) => {
    let id = req.params.cid;

    try {
        const cart = await cartManager.getProductById(id);
        if(!cart) {
            res.json({
                error: "Producto no encontrado"
            });
        } else {
            res.json(cart)
        }
    } catch (error) {
        console.log("Ocurrió un error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updateCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartManager.deleteProductFromCart(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
        const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.ActQuantityFromCart(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        
        const updatedCart = await cartManager.emptyCart(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});


module.exports = router;