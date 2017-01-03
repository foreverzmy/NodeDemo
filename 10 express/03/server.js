// 使用模板引擎jade
const express = require('express');
const app = express();

app
    .set('view engine', 'jade')
    .get('/', (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello World!' });
    })
    .listen(9000, () => {
        console.log(`server running at port 9000`);
    })
