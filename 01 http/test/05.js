const request = require('request');

const url = 'http://localhost:9000';

request
  .post({
      url: 'http://localhost:9000/',
      form: { key: 'Alpha' }
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    });

request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage. 
    }
  })
  .on('error', function(e) {
    console.log("Got error: " + e.message);
  });

request({
    method: 'DELETE',
    preambleCRLF: true,
    postambleCRLF: true,
    uri: 'http://localhost:9000/2',
    multipart: {
      data: [{ body: 'I am an attachment' }]
    }
  },
  function(error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log(body);
  }
)