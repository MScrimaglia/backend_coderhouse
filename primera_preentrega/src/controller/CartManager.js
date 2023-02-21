const fs = require('fs');
const ProductManager = require('./ProductManager.js')

const productManager = new ProductManager();

class CartManager {

    constructor() {
        this.path = './data/carts.json';
    }


    async addCart(products) {

        let carts = [];

        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => carts = JSON.parse(data))
        .finally(() => {
            let cart_id = Math.floor(100000 + Math.random() * 900000);

            let cart = {
                id: cart_id,
                products: []
            }

            for  (let product of products) {
                cart.products.push(product);
            }

            carts.push(cart)

            fs.promises.writeFile(this.path, JSON.stringify(carts));
        })
 
    }

    getCartProductsById = async (id) => {

        let products = [];
        
        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => {
            let carts = JSON.parse(data)
            let cart = carts.find(selected_cart => selected_cart.id == id);
            products = cart.products
        })

        return products;
        
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