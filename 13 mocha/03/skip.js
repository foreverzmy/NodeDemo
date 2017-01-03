// it.skip:忽略case
const fs = require('fs')

describe('File', () => {
    describe('#readFile()', () => {
        it.skip('should read test.js without error', (done) => {
            fs.readFile('test.as', (err) => {
                if (err) throw err;
                done();
            })
        })
        it('should read test.ls without error', (done) => {
            fs.readFile('test.ls', (err) => {
                if (err) throw err;
                done();
            })
        })
    })
})