function wait(ms) {
    return function(done) {
        setTimeout(done, ms);
    }
}

export default {
    version: '1.0.0',
    now: () => { return new Date() },
    ip: async ctx => {
        await wait(1000);
        return ctx.ip;
    },
    callback: () => {
        return cb => {
            return '<p>callback</p>';
        }
    },
    callbackGen: () => {
        return async() => {
            await wait(3000);
            return '<p>callbackGen</p>';
        }
    },
    doNothing: () => {
        console.log('This is not print!');
    }
}