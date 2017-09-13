const log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'file',
        filename: 'default.log'
    }]
});
const logger = log4js.getLogger('custom-appender');
logger.debug("Time:", new Date());