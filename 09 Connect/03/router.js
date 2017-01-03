const parse = require('url').parse;

module.exports = function router(obj) {
  return function(req, res, next) {
    if (!obj[req.method]) { // 检查以确保req.method定义了
      next(); // 如果未定义，调用next()，并停止一切后续操作
      return;
    }
    let routes = obj[req.method]; // 查找req.method对应的路径
    let url = parse(req.url);
    let paths = Object.keys(routes); // 将req.method对应的路径存放到数组中

    for (var i in paths) { // 遍历路径
      let path = paths[i];
      let fn = routes[path];
      path = path.replace(/\//g, '\\/').replace(/:(\w+)/g, '([^\\/]+)');
      let re = new RegExp(`^${path}$`);
      let captures = url.pathname.match(re);
      if (captures) {
        let args = [req, res].concat(captures.slice(1)); //　传递被捕获的分组
        fn.apply(null, args);　 // 当有相匹配的函数时，返回，以防止后续的next()调用
        return;
      }
    }
    next();
  }
}