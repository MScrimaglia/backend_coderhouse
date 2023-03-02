const express = require('express');
const handlebars = require('express-handlebars');

const productsRouter = require('./router/productsRouter.js');
const cartsRouter = require('./router/cartsRouter.js');

const app = express();
const port = 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended:true}));
app.set('views', 'src/views')

app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);

app.get('/', async (req,res) => {
    let products = [{title: 'titulo1'},{title:'titulo2'}];
    await fetch('http://127.0.0.1:8080/api/products')
    .then(response => response.json())
    .then((json) => {
        products = json;
    });

    res.render('index', {products:products});
})

app.listen(port,() => console.log('Port 8080'))