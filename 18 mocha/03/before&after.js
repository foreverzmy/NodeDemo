const fs = require('fs')

describe('File', () => {
    describe('#readFile()', () => {
        before(() => {
            console.log('beforeEach')
        })
        beforeEach(() => {
            console.log('before')
        })
        after(() => {
            console.log('after')
        })
        afterEach(() => {
            console.log('afterEach')
        })
        it('should read test.ls without error', (done) => {
            fs.readFile('test.ls', (err) => {
                if (err) throw err;
                done();
            })
        })
        it('should read test.js without error', (done) => {
            fs.readFile('test.js', (err) => {
                if (err) throw err;
                done();
            })
        })
    })
})