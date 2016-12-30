// 仅仅输出日志的内容；
const log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console',
        layout: {
            type: 'messagePassThrough',
        }
    }]
})
const logger = log4js.getLogger('layout-pattern');
logger.debug("Time:", new Date());