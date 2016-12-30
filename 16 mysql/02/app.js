import http from 'http'

import db from './lib/mysql_setting'
import { show, showArchived } from './lib/show'
import add from './lib/add'
import archive from './lib/archive'
import delet from './lib/delete'

const server = http.Server();

server
  .on('request', (req, res) => {
    switch (req.method) {
      case 'GET':
        switch (req.url) {
          case '/':
            show(db, res);
            break;
          case '/archived':
            showArchived(db, res);
            break;
        }
        break;
      case 'POST':
        switch (req.url) {
          case '/':
            add(db, req, res);
            break;
          case '/archive':
            archive(db, req, res);
            break;
          case '/delete':
            delet(db, req, res);
            break;
        }
        break;
      default:
        break;
    }
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })