const fs = require('fs');
const ProductManager = require('./ProductManager.js')

const productManager = new ProductManager();

class CartManager {

    constructor() {
        this.path = './data/carts.json';
    }


    async addCart(products_id) {

        let carts = [];

        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => carts = JSON.parse(data))
        .finally(() => {
            let cart_id = Math.floor(100000 + Math.random() * 900000);
            console.log(cart_id);

            let cart = {
                id: cart_id,
                products: []
            }
            console.log(cart);

            for (let product_id of products_id) {
                productManager.getProductById(product_id).then(product => {
                    if (!product.hasOwnProperty('error')) {
                        cart.products.push(product);
                    }
                })
            }

            carts.push(cart)
            console.log(carts);

            fs.promises.writeFile(this.path, JSON.stringify(carts));
        })
 
    }

    getProductById = async (id) => {
        return await this.getProducts().then((products) => {
            for (let product of products) {
                if (product.id == id) {
                    return product;
                }
            }
        return {'error': 'Product not found'};
        })
        
        
    }

    updateProduct = async (id, new_val) => {

        if (new_val.hasOwnProperty('id')){
            console.error('ID can not be modified');
            return;
        }

        await this.getProducts().then((products) => {

            let outdated_product = products.find(product => product.id == id);

            Object.assign(outdated_product, new_val)

            fs.promises.writeFile(this.path, [JSON.stringify(products)]);
        })
    }

    deleteProduct = async (id) => {

        await this.getProductById(id).then((target_product) => {
            this.getProducts().then((products) => {
                products.map((product) => {
                    if (product.id == target_product.id) {
                        products.splice(products.indexOf(product),1);
                        fs.promises.writeFile(this.path, [JSON.stringify(products)]);
                    }
                })
            })
        })
    }

}


module.exports = CartManager;