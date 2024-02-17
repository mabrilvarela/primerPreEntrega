class cartManager {

    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    async addCart(title, description, price, img, code, stock) {

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if(this.cart.some(word => word.code === code)) {
            console.log("El código debe ser único");
            return;
        }
    }
}

module.exports = router;