import http from 'http'

import getEntries from './lib/getEntries'
import blogPage from './lib/blogPage'

let entries = getEntries();

const server = http.Server();

server
  .on('request', (req, res) => {
    let output = blogPage(entries);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  })
  .listen(9000, () => {
    console.log('Server running at post 9000.')
  })