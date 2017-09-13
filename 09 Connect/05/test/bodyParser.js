const http = require('http');

let req = http.request({
  method: 'POST',
  port: 9000,
  headers: {
    'Content-type': 'application/json'
  }
});

const user = { username: 'forever' };

req.write(JSON.stringify(user));

req.end();