const { readFile,unlink } =require(`fs`);

readFile('data/data.txt', function(err, data) {
    console.log(data.toString());
    unlink('data/data.txt');
});

readFile('data/data.txt', function(err, data) {
    console.log(data.toString());
});
