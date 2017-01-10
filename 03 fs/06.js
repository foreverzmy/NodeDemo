const fs = require('fs');

fs.watchFile('./README.md', (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    console.log('README.md has been modified.')
  }
})