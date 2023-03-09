const express = require('express');
const handlebars = require('express-handlebars');
const productsRouter = require('./router/productsRouter.js');
const cartsRouter = require('./router/cartsRouter.js');
const ProductManager = require('./controller/ProductManager.js')
const {Server} = require('socket.io')

const app = express();
const port = 8080;
const base_url = 'http://127.0.0.1:8080/';

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended:true}));
app.set('views', __dirname+'/views');

app.use(express.static(__dirname+'/public'));
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);

app.get('/', async (req,res) => {
    let products = [{title: 'No se han encontrado productos'}];
    await fetch(base_url + 'api/products')
    .then(response => response.json())
    .then((json) => {
        products = json;
    });

    res.render('index', {products:products});
})

app.get('/realtimeproducts', async (req,res) => {
    let products = [{title: 'No se han encontrado productos'}];
    await fetch(base_url + 'api/products')
    .then(response => response.json())
    .then((json) => {
        products = json;
    });

    res.render('realTimeProducts', {products:products});
})

const httpServer = app.listen(port,() => console.log('Port 8080'));
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('New connection');

    socket.on('product_submit', async (product) => {
        console.log('PRODUCT TITLE: ' + product.title);
        const productManager = new ProductManager();
        await productManager.addProduct(product.title, product.description, product.price, 'sin imagen', product.code, product.stock);
    })
})