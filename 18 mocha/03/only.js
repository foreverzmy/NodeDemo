const fs = require('fs')

describe('File', () => {
    describe('#readFile()', () => {
        it.only('should read test.ls without error', (done) => {
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