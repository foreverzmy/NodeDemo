//用URL模块解析URL
var URL = require('url');//url解析模块

var myUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string&name=Tom#hash';

var parseUrl = URL.parse(myUrl);

console.log(parseUrl.href);//完整的URL
console.log(parseUrl.protocol);//协议，http、https、ftp等
console.log(parseUrl.auth);//用户证书
console.log(parseUrl.host);//完整的hostname，域名和端口
console.log(parseUrl.hostname);//包含url的主机名
console.log(parseUrl.port);//端口
console.log(parseUrl.pathname);//文件路径
console.log(parseUrl.path);//文件路径和HTTP GET参数
console.log(parseUrl.search);//HTTP GET参数包含？
console.log(parseUrl.query);//HTTP GET参数,不包含？
console.log(parseUrl.hash);//锚点
