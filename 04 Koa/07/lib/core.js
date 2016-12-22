// 聚合并导出模型函数
const Comment = require('./comment');
const Topic = require('./topic');
const User = require('./user');

module.exports = {
    get $User() {
        return User;
    },

    get $Comment() {
        return Comment;
    },

    get $Topic() {
        return Topic;
    }
};