const Koa = require('koa');
const request = require('co-supertest')

const app = Koa();

app.use(function*(ctx) {
  if (ctx.path == '/user')
    ctx.body = { name: 'tobi' }
})

describe('koa', () => {
  it('Get /user', function*() {
    yield request(app.callback())
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200, done)
  })
})