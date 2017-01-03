const app = require('express')();

var tweets = {};

app.set('view engine', 'jade');

app.get('/', (req, res) => {
    let title = 'forever',
        header = 'Welcome to the world!';
    res.render('index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            'stylesheets': ['/public/style.css']
        },
    })
})

app.listen(9000, () => {
    console.log('Server running at post 9000!')
});
