const connect = require('connect');
const bodyParser = require('body-parser');

const app = connect();

app.use(bodyParser.urlencoded({ extended: false }))
app
  .use(bodyParser.json())
  .use((req, res) => {
    console.log(req.body);
    // console.log(req.files);
    res.end('OK.');
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  });