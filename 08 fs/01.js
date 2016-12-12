var fs = require('fs');

var filehandle = fs.readFile('data/data.txt', function(err, data) {
    console.log(data.toString());
})
