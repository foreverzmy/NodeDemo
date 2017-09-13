const connect = require('connect');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = connect();

function edit(req, res, next) {
  if (req.method !== 'GET')
    return next();
  res.setHeader('Content-type', 'text/html');
  res.write(`<form method='POST' enctype="application/x-www-form-urlencoded">
  <input type='hidden' name='_method' value='PUT'>
  <input type='text' name='user[name]' value='Tobi'>
  <input type='submit' value='Update'>
  </form>`);
  res.end();
}

function update(req, res, next) {
  if (req.method !== 'PUT')
    return next();
  res.end(`Update name to ${req.body.user.name}`);
}

app
  .use(bodyParser.urlencoded())
  .use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }))
  .use(edit)
  .use(update)
  .listen(9000, () => {
    console.log('Server running ar port 9000.')
  })