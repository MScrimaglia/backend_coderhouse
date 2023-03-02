const express = require('express');
const handlebars = require('express-handlebars');

const productsRouter = require('./router/productsRouter.js');
const cartsRouter = require('./router/cartsRouter.js');

const app = express();
const port = 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    testUser = {
        name: 'TEST'
    }

    res.render('index', testUser);
})


app.use(express.urlencoded({extended:true}));

app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);

app.listen(port,() => console.log('Port 8080'))