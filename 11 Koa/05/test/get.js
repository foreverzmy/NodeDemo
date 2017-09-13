// Get请求测试
const request = require('request');

const url = 'http://localhost:9000';

request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage. 
    }
})