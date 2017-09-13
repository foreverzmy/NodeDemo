//DNS查询
var dns = require('dns');

//将一个域名解析为一个指定记录类型(A,AAAA,MX等)的数组。
dns.resolve('google.com', 'AAAA', function(err, r) {
    if (err) {
        console.log(err);
    }
    console.log(`Google AAAA: ${r}`);
})

//仅查询IPv4(A记录）
dns.resolve4('google.com', function(err, r) {
    if (err) {
        console.log(err);
    }
    console.log(`Google A: ${r}`);
})

//仅查询IPv6(AAAA查询）
dns.resolve6('google.com', function(err, r) {
    if (err) {
        console.log(err);
    }
    console.log(`Google AAAA: ${r}`);
})

//仅查询邮件交换(MX记录)。
dns.resolveMx('163.com', function(err, r) {
    if (err) {
        console.log(err);
    }
    console.log(`163 mail: ${r}`);
})

//查询单个A记录
dns.lookup('baidu.com', 4, function(err, r) {
    if (err) {
        console.log(err);
    }
    console.log(`baidu single: ${r}`);

})
