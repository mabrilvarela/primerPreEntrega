const productModel = require("../models/product.model.js");

class productManager {
    async addProduct({title, description, price, img, code, stock, category, thumbnails}) {
        try {
            if(!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const productExist = await productManager.findOne({code: code});
            if(productExist){
                console.log("El código debe ser único");
                return;
            }

            const newProduct = new productModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch (error) {
            console.log("Error al agregar un producto", error);
            throw error;
        }
    }

    async getProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            console.log("Error al recuperar los productos", error);
            throw error;            
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id)
            if(!product) {
                console.log("Producto no encontrado");
                return null
            }

            console.log("Producto encontrado");
            return product;

        } catch (error) {
            console.log("Error al recuperar producto por ID", error);
            throw error;
        }
    }

    async updateProduct(id, actualProduct) {
        try {
            const updateProduct = await productModel.findByIdAndUpdate(id, actualProduct);
            if(!updateProduct) {
                console.log("Producto no encontrado");
                return null;
            }
            console.log("Producto actualizado");
            return updateProduct;

        } catch (error) {
            console.log("Error al actualizar producto", error);
            throw error;
        }
    }

    async deleteProduct(id){
        try {
            const deleteProduct = await productModel.findByIdAndUpdate(id);
            if(!deleteProduct) {
                console.log("Producto eliminado");
                return null;
            }
            console.log("Producto eliminado");

        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

module.exports = productManager;