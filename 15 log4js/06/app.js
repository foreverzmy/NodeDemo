const log4js = require('log4js');
const express = require('express');

log4js.configure({
    appenders: [{
        type: 'DateFile',
        filename: 'access.log',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        category: 'access'
    }]
});

const app = express();

app.use(log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(9000, () => {
    console.log('Server running at port 9000!');
});