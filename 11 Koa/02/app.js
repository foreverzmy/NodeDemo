// 了解async的使用
import Koa from 'koa';
const app = new Koa();

app.use(async(ctx) => { //定义async函数
    ctx.body = "header\n";
    await saveResults(ctx); //暂停async函数执行saveResults；
    ctx.body += "footer\n";
});

async function saveResults(ctx) {
    ctx.body += "Results Saved!\n";
};

app
    .on('error', (err) => {
        console.log('server error', err);
    })
    .listen(9000, () => {
        console.log('Server running at post 9000!')
    });