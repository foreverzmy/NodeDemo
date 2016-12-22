import path from 'path'

export default {
    port: process.env.PORT || 3000,
    mongodb: {
        url: "mongodb://127.0.0.1:27017/club"
    },
    schemeConf: path.join(__dirname, '../public/theme'),
    staticConf: path.join(__dirname, '../public'),
    renderConf: path.join(__dirname, '../theme/config'),
    routerConf: 'routes',
    routerCacheConf: {
        '/': {
            expire: 10 * 1000,
            condition: ctx => {
                return !ctx.session || !ctx.session.user
            }
        }
    }
}