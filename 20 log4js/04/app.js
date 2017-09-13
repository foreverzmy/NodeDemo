const log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'logLevelFilter',
        level: 'DEBUG',
        category: 'category1',
        appender: {
            type: 'file',
            filename: 'default.log'
        }
    }]
})
const logger1 = log4js.getLogger('category1');
const logger2 = log4js.getLogger('category2');
logger1.debug("Time:", new Date());
logger1.trace("Time:", new Date());
logger2.debug("Time:", new Date());