import mime from 'mime'
import path from 'path'

function sendFile(res, filePath, fileContents) {
  res.writeHead(200, {
    "Content-type": mime.lookup(path.basename(filePath))
  });
  res.end(fileContents);
}

export default sendFile