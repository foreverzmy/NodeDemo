import Router from 'koa-router'

import config from './config'

const router = new Router();

const filters = {
    format: time => {
        return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
    }
}

console.time('time');
router.get('/', async ctx => {
    ctx.state = {
        users: [
            { name: 'John' },
            { name: 'Jack' },
            { name: 'Tom' }
        ],
        filters,
    };
    await ctx.render('users', config);
})
console.timeEnd('time');

export default router