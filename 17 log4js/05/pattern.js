// 这是一种特殊类型，可以通过它来定义任何你想要的格式。
const log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console',
        layout: {
            type: 'pattern',
            pattern: '[%r] [%[%5.5p%]] - %m%n'
        }
    }]
})
const logger = log4js.getLogger('layout-pattern');
logger.debug("Time:", new Date());