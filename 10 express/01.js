// 搭建简单express服务器
const express = require('express');
const app = express();

app
    .get('/', (req, res) => {
        res.send(`Hello World!`);
    })
    .listen(9000, () => {
        console.log(`server running at port 9000`);
    })
