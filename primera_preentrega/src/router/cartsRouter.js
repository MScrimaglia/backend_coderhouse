const express = require('express');

const cartsRouter = express.Router();

const CartManager = require("../controller/cartManager.js");

const cartManager = new CartManager();

cartsRouter.post('/', async (req, res) => {
    let products = JSON.parse(req.query.products);
    await cartManager.addCart(products);
});

cartsRouter.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    await cartManager.getCartProductsById(id).then(products => {
        res.send(products);
    });
});

module.exports =  cartsRouter;