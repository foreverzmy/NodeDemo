const add = require('./add')
const assert = require('assert')

describe('加法函数测试', () => {
  it('1+1=2', () => {
    assert.equal(3, add(1, 1))
  })
})