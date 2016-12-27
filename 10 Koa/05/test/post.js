// post请求测试
const request = require('request');

request
  .post({
      url: 'http://localhost:9000/users',
      form: { key: 'gamma' }
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    })
  .on('error', function(e) {
    console.log("Got error: " + e.message);
  });
console.log('done')