// 通过express加载HTML文件
const express = require('express');
const app = express();

app
    .get('/', (req, res) => {
        res.sendFile(__dirname + '/views/index.html');
    })
    .listen(9000, () => {
        console.log(`server running at port 9000`);
    })
