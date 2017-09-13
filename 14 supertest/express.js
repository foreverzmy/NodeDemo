const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/user', (req, res) => {
  res.status(200).json({ name: 'tobi' });
})

app.post('/users', (req, res) => {
  if (req.body.name === 'my awesome avatar') {
    console.log(req.body.name)
    res.send({ 'avatar': 'test/fixtures/homeboy.jpg' })
  }
})

describe('express', () => {
  it('GET /user', (done) => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200, done)
  })
  it('POST /users', () => {
    request(app)
      .post('.users')
      .field('name', 'my awesome avata')
      .attach('avatar', 'test/fixtures/homeboy.jpg')
  })
})