import * as request from 'request';

const url = 'http://tools.bugcode.cn';

request.post(url + '/cities/search', { form: { action: 'countries', language: 'cn' } }, (err, data) => {
  console.log(data)
})