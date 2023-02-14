
const express = require('express');

const app = express();
const port = 8080;

app.use(express.urlencoded({extended:true}));

const ProductManager = require('./ProductManager.js');
let productManager = new ProductManager();

app.get('/products', async (req, res) => {

    let limit = req.query.limit;

    await productManager.getProducts().then( response => {
        if (limit) {
            return res.send(response.slice(0,limit));
        }
        return res.send(response);
    });
})

app.listen(port,() => console.log('Port 8080'))
