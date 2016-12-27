 function send404(res) {
   res.writeHead(400, { 'Content-type': 'text/plain' });
   res.write('Error 404:resource not found.');
   res.end();
 }
 export default send404