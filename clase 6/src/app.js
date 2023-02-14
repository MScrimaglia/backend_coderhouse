const express = require('express');

const app = express();
const port = 8080;

app.get('/saludo',(req, res) => {
    res.send('Hello world!');
})

app.listen(port,() => console.log('Port 8080'))
