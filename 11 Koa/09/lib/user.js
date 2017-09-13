import redis from 'redis'
import bcrypt from 'bcryptjs'

const db = redis.createClient(6379, '127.0.0.1');

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  /* 把用户保存到Redis中，*/
  save(fn) {
    if (this.id) { // 用户已存在
      this.update(fn);
    } else {
      db.incr('user:ids', (err, id) => { // 创建唯一的ID
        if (err) throw err;
        this.id = id; // 设定ID
        this.hashPassword(err => {
          if (err) throw err;
          this.update(fn); // 保存用户属性
        })
      })
    }
  }

  update(fn) {
    let id = this.id;
    db.set('user:id' + this.name, id, err => { // 用名称索引用户ID
      if (err) return fn(err);
      db.hmset('user:' + id, this, err => { fn(err) }); // 用hash存储数据
    });
  }

  hashPassword(fn) {
    bcrypt.genSalt(12, (err, salt) => { // 生成12个字符的盐
      if (err) throw err;
      this.salt = salt; // 保存盐
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return fn(err);
        this.pass = hash; // 保存哈希
        fn();
      })
    })
  }
}

// 根据名称查找用户ID
User.getByName = function(name, fn) {
  User.getId(name, (err, id) => {
    if (err) throw err;
    User.get(id, fn);
  })
}

// 获取由名称索引的ID
User.getId = function(name, fn) {
  db.get(`user:id${name}`, fn);
}

// 获取普通对象哈希
User.get = function(id, fn) {
  db.hgetall(`user:${id}`, (err, user) => {
    if (err) throw err;
    fn(null, new User(user));
  })
}

// 认证用户的名称和密码
User.authenticate = function(name, pass, fn) {
  User.getByName(name, (err, user) => { // 通过名称查找用户
    if (err) return fn(err);
    if (!user.id) return fn(); // 用户不存在
    bcrypt.hash(pass, user.salt, (err, hash) => {
      if (err) return fn(err);
      if (hash === user.pass) return fn(null, user); // 匹配发现项
      fn();
    })
  })
}

export default User