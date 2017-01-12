const fs = require('fs');

fs.watch('./README.md', (e, filename) => {
  console.log(e);
  console.log(filename);
});