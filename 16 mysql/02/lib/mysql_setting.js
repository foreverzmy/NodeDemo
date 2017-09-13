import mysql from 'mysql';

// 连接MySQL服务器
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'timetrack'
});

let sql = `CREATE TABLE IF NOT EXISTS work(
  id INT(10) PRIMARY KEY AUTO_INCREMENT,
  hours DECIMAL(5,2) DEFAULT 0,
  date DATE,
  archived INT(1) DEFAULT 0,
  description LONGTEXT
)`;

// 数据库建表操作
db.query(sql, (err) => {
  if (err) throw err;
  console.log('create database success.')
})

export default db;