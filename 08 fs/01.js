const {readFile} = require('fs');

let filehandle = readFile('data/data.txt', function(err, data) {
    console.log(data.toString());
})
