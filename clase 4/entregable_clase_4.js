const fs = require('fs');

class ProductManager {

    constructor() {
        this.path = './products.json';
    }


    getProducts = async () => {
        let products;

        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => products = JSON.parse(data))
        .catch(() => products = []);


        return products;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (arguments.length != 6) {
            return console.error('Invalid number of parameters');
        }
        for (let argument of arguments){
            if (argument == false){
                console.error('Missing required parameter');
            }
        }
        await this.getProducts().then((products) => {
            for (let product of products) {
                if (product.code == code) {
                    return console.error('Product code is already in use');
                }
            }

            let id_value = 1;

            if (products.length > 0) {
                id_value = (Math.max(...products.map(o => o.id))) + 1;
            }


            let product = {
                id: id_value,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            products.push(product);
            fs.promises.writeFile(this.path, [JSON.stringify(products)]);
        })
        .catch((error) => console.error(error));
        
    }

    getProductById = async (id) => {
        return await this.getProducts().then((products) => {
            for (let product of products) {
                if (product.id == id) {
                    return product;
                }
            }
        console.error('Product not found');
        return;
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
                    console.log('index' + products.indexOf(product));
                    if (product.id == target_product.id) {
                        products.splice(products.indexOf(product),1);
                        console.log('producttsatsdatdsarsd' + products);
                        fs.promises.writeFile(this.path, [JSON.stringify(products)]);
                    }
                })
            })
        })
    }

}


// Testing
let instance = new ProductManager();
/* instance.addProduct('titulo', 'descripcion', 25, 'Sin imagen', 'ytr654', 14).then(() => {
    console.log(instance.product_counter);
    instance.addProduct('titulo2', 'descripcion2', 35, 'Sin imagen', 'hrr644', 11).then(() => {
        instance.getProducts().then((result) => console.log(result));
        instance.getProductById(2).then((result) => console.log(result));
        instance.updateProduct(2, {price:70}).then(() => instance.deleteProduct(1));
    })
}); */