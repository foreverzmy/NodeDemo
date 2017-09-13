/**使用Node.js连接MySQL服务器，执行INSERT操作**/
const mysql = require('mysql');

// 连接MySQL服务器
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'forever'
});

// 增
function insert(name, age) {
  let sql = 'INSERT INTO users VALUES(NULL,?,?)';
  conn.query(sql, [name, age], (err, result) => {
    // 查看执行结果
    if (err) throw err;
    console.log(`changed ${result.affectedRows} rows`);
    console.log(`INSERT产生的自增编号：${result.insertId}`);

  });
};

// 删
function delet() {
  let sql = 'DELETE FROM users WHERE uname="tom"';
  conn.query(sql, function(err, result) {
    if (err) throw err;
    console.log(`changed ${result.affectedRows} rows`);
  })
}

// 改
function update() {
  let sql = 'UPDATE users SET upwd=233 WHERE uname="mary"';
  conn.query(sql, function(err, result) {
    if (err) throw err;
    console.log(`changed ${result.affectedRows} rows`);
  })
}

// 查
function select() {
  let sql = 'SELECT * FROM users';
  conn.query(sql, function(err, rows) {
    // 查看执行结果
    if (err) throw err;
    if (rows.length > 0) {
      for (let key in rows) {
        console.log(rows[key].uid, rows[key].uname, rows[key].upwd);
      }
    } else {
      console.log('没有查询到任何记录行');
    }
  });
}

insert('forever', '22');
// delet();
// update();
select();

// 断开连接
conn.end();