// 了解async的使用
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx, next) => { //定义async函数
    ctx.body = "header\n";
    await next(ctx); //暂停async函数执行saveResults；
    ctx.body += "footer\n";
});

function saveResults(ctx) {
    ctx.body += "Results Saved!\n";
};

app.listen(9000, () => {
    console.log('Server running at post 9000!')
});
