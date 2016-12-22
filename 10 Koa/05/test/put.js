// post请求测试
const request = require('request');

request({
    method: 'PUT',
    url: 'http://localhost:9000/users',
    multipart: [{
        'content-type': 'application/json',
        body: JSON.stringify({ key: 'beta' })
    }, { body: 'I am an attachment' }]
})
console.log('done')