	var mongoose = require('mongoose');
	// 引入 mongoose 模块
	mongoose.connect('mongodb://localhost/blog');
	// 然后连接对应的数据库：mongodb://localhost/test
	// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
	// 端口号省略则默认连接 27017；blog是数据库的名称
	// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
	module.exports = mongoose;
	// 导出 mongoose 模块
	var mongoose = require('../modules/db');
	// 引入 mongoose 模块
	var User = mongoose.model('User', {
	    name: { type: String, match: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/ },
	    password: String
	});
	//创建了一个名为 User 的 model
	var user1 = new User({ name: '12345@qqqqqq.com' });
	user1.password = 'a5201314';
	user1.save(function(err) {
	    if (err) {
	        console.log("save error");
	    }
	});