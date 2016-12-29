const mysql = require('mysql');

// 连接MySQL服务器
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'forever'
});