//用URL模块解析URL
var URL = require('url'); //url解析模块
var qs = require('querystring'); //query字符串解析

var myUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string&name=Tom#hash';

var parseUrl = URL.parse(myUrl);

var queryJson = qs.parse(parseUrl.query); //将query字符串解析为object
console.log(queryJson);

var myObj = {
    name: 'Tom',
    gender: 'M',
    age: 22
}
var strObj = qs.encode(myObj); //将object编码为query字符串
console.log(strObj);
