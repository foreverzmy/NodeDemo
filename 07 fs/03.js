var fs = require('fs');
fs.writeFile('data/data.txt','This is a demo!',function (err,data) {
	console.log('Done!')
})
