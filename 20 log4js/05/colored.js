// 在日志的内容前面会加上时间、日志的级别和类别，通常日志的默认 layout；
const log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console',
        layout: {
            type: 'colored',
            colored: 'red'
        }
    }]
})
const logger = log4js.getLogger('layout-pattern');
logger.debug("Time:", new Date());